import { TokenType } from '~/constants/enum'
import {
  ACCESS_TOKEN_EXPIRES_IN,
  JWT_SECRET_ACCESS_TOKEN,
  JWT_SECRET_REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRES_IN
} from '~/constants/env'
import HTTP_STATUS from '~/constants/httpStatus'
import { USER_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import { AuthReqBody } from '~/models/requests/Auth.requests'
import { ChangePasswordReqBody, MemberReqBody } from '~/models/requests/Member.requests'
import Member from '~/models/schemas/Member.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { comparePassword, hashPassword } from '~/utils/bcrypt'
import convertEpochToDateWithOffset from '~/utils/convertEpochToDateWithOffset'
import { signToken, verifyToken } from '~/utils/jwt'

class UserService {
  private signAccessToken({ userId }: { userId: string }) {
    return signToken({
      payload: {
        userId,
        tokenType: TokenType.AccessToken
      },
      privateKey: JWT_SECRET_ACCESS_TOKEN,
      options: {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }

  private signRefreshToken({ userId, exp }: { userId: string; exp?: number }) {
    const token = {
      payload: {
        userId,
        tokenType: TokenType.RefreshToken
      },
      privateKey: JWT_SECRET_REFRESH_TOKEN
    }

    if (exp) {
      return signToken({
        ...token,
        payload: {
          ...token.payload,
          exp
        }
      })
    }

    return signToken({
      ...token,
      options: {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }

  private async signAccessAndRefreshTokens({ userId, expires }: { userId: string; expires?: number }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken({
        userId
      }),
      this.signRefreshToken({
        userId,
        exp: expires
      })
    ])
    const { iat, exp } = await this.decodeRefreshToken(refreshToken)
    await RefreshToken.create({
      token: refreshToken,
      userId,
      iat: convertEpochToDateWithOffset(iat),
      exp: convertEpochToDateWithOffset(exp)
    })

    return {
      accessToken,
      refreshToken
    }
  }

  private async decodeRefreshToken(refreshToken: string) {
    return verifyToken({
      token: refreshToken,
      secretOrPublicKey: JWT_SECRET_REFRESH_TOKEN
    })
  }

  async signUp(body: AuthReqBody) {
    // Check if member name already exists
    const member = await Member.findOne({
      memberName: body.memberName
    })
    if (member) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.CONFLICT,
        message: USER_MESSAGES.MEMBER_NAME_ALREADY_EXISTS
      })
    }

    // Create member
    const data = await Member.create({
      ...body,
      password: hashPassword(body.password),
      isAdmin: false
    })

    // Sign access and refresh tokens
    return await this.signAccessAndRefreshTokens({
      userId: data.id
    })
  }

  async signIn(body: AuthReqBody) {
    // Check if member is not found
    const member = await Member.findOne({
      memberName: body.memberName
    })
    if (!member) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: USER_MESSAGES.MEMBER_NAME_OR_PASSWORD_IS_INCORRECT
      })
    }

    // Check if password is incorrect
    const isCorrectPassword = comparePassword(body.password, member.password)
    if (!isCorrectPassword) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: USER_MESSAGES.MEMBER_NAME_OR_PASSWORD_IS_INCORRECT
      })
    }

    // Sign access and refresh tokens
    return await this.signAccessAndRefreshTokens({
      userId: member.id
    })
  }

  async getUserById(userId?: string) {
    return Member.findById(userId, {
      password: 0
    })
  }

  async getMembers() {
    return Member.find(
      {},
      {
        password: 0
      }
    )
  }

  async checkExistMemberName(memberName: string) {
    return Member.exists({
      memberName
    })
  }

  async updateMember(id: string, body: MemberReqBody) {
    const isExisted = await this.checkExistMemberName(body.memberName)

    if (isExisted) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: USER_MESSAGES.MEMBER_NAME_ALREADY_EXISTS
      })
    }

    return Member.updateOne(
      {
        _id: id
      },
      {
        $set: body
      }
    )
  }

  async changePassword(id: string, body: ChangePasswordReqBody) {
    // Check if member is not found
    const member = await Member.findById(id)
    if (!member) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: USER_MESSAGES.USER_NOT_FOUND
      })
    }

    // Check if password is incorrect
    const isCorrectPassword = comparePassword(body.oldPassword, member.password)
    if (!isCorrectPassword) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: USER_MESSAGES.CURRENT_PASSWORD_IS_INCORRECT
      })
    }

    return Member.updateOne(
      {
        _id: id
      },
      {
        $set: {
          password: hashPassword(body.password)
        }
      }
    )
  }

  async checkExistedRefreshToken(token: string) {
    return RefreshToken.exists({
      token
    })
  }

  async refreshToken({ refreshToken, userId, exp }: { refreshToken: string; userId: string; exp: number }) {
    await RefreshToken.deleteOne({
      token: refreshToken
    })

    return await this.signAccessAndRefreshTokens({
      userId,
      expires: exp
    })
  }
}

const userService = new UserService()

export default userService
