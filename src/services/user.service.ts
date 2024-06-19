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
import { MemberReqBody } from '~/models/requests/Member.requests'
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

  private async signAccessAndRefreshTokens({ userId }: { userId: string }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken({
        userId
      }),
      this.signRefreshToken({
        userId
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

  async getUserById(userId: string) {
    return Member.findById(userId)
  }

  async getMembers() {
    return Member.find({})
  }

  async getMemberByName(memberName: string) {
    return Member.findOne({
      memberName
    })
  }

  async checkExistMemberName(memberName: string) {
    return Member.exists({
      memberName
    })
  }

  async updateMember(memberName: string, body: MemberReqBody) {
    const isExisted = await this.checkExistMemberName(body.memberName)

    if (isExisted) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: USER_MESSAGES.MEMBER_NAME_ALREADY_EXISTS
      })
    }

    return Member.updateOne(
      {
        memberName
      },
      {
        $set: body
      }
    )
  }
}

const userService = new UserService()

export default userService
