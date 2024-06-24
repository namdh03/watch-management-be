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
import { SignInReqBody, SignUpReqBody } from '~/models/requests/Auth.requests'
import { ChangePasswordReqBody, MemberReqBody } from '~/models/requests/Member.requests'
import Member from '~/models/schemas/Member.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { comparePassword, hashPassword } from '~/utils/bcrypt'
import convertEpochToDateWithOffset from '~/utils/convertEpochToDateWithOffset'
import { signToken, verifyToken } from '~/utils/jwt'

class UserService {
  private signAccessToken({ userId, isAdmin }: { userId: string; isAdmin: boolean }) {
    return signToken({
      payload: {
        userId,
        isAdmin,
        tokenType: TokenType.AccessToken
      },
      privateKey: JWT_SECRET_ACCESS_TOKEN,
      options: {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }

  private signRefreshToken({ userId, isAdmin, exp }: { userId: string; isAdmin: boolean; exp?: number }) {
    const token = {
      payload: {
        userId,
        isAdmin,
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

  private async signAccessAndRefreshTokens({
    userId,
    isAdmin,
    expires
  }: {
    userId: string
    isAdmin: boolean
    expires?: number
  }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken({
        userId,
        isAdmin
      }),
      this.signRefreshToken({
        userId,
        isAdmin,
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

  async signUp(body: SignUpReqBody) {
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
    const newMember = await Member.create({
      ...body,
      password: hashPassword(body.password),
      isAdmin: false
    })

    // Sign access and refresh tokens
    return await this.signAccessAndRefreshTokens({
      userId: newMember.id,
      isAdmin: newMember.isAdmin
    })
  }

  async signIn(body: SignInReqBody) {
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
      userId: member.id,
      isAdmin: member.isAdmin
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

  async updateMember(userId: string, body: MemberReqBody) {
    const isExisted = await this.checkExistMemberName(body.memberName)

    if (isExisted && userId !== String(isExisted._id)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: USER_MESSAGES.MEMBER_NAME_ALREADY_EXISTS
      })
    }

    return Member.findOneAndUpdate(
      {
        _id: userId
      },
      {
        $set: body
      },
      {
        returnDocument: 'after',
        projection: {
          password: 0
        }
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

  async refreshToken({
    refreshToken,
    userId,
    isAdmin,
    exp
  }: {
    refreshToken: string
    userId: string
    isAdmin: boolean
    exp: number
  }) {
    await RefreshToken.deleteOne({
      token: refreshToken
    })

    return await this.signAccessAndRefreshTokens({
      userId,
      isAdmin,
      expires: exp
    })
  }

  async signOut(refreshToken: string) {
    return await RefreshToken.deleteOne({
      token: refreshToken
    })
  }

  async getMe(userId: string) {
    return Member.findById(userId, {
      password: 0
    })
  }

  async getUsers() {
    return Member.find(
      {
        isAdmin: false
      },
      {
        password: 0,
        isAdmin: 0
      }
    )
  }
}

const userService = new UserService()

export default userService
