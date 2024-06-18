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
import Member from '~/models/schemas/Member.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { comparePassword, hashPassword } from '~/utils/bcrypt'
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

  private signAccessAndRefreshTokens({ userId, exp }: { userId: string; exp?: number }) {
    return Promise.all([
      this.signAccessToken({
        userId
      }),
      this.signRefreshToken({
        userId,
        exp
      })
    ])
  }

  private decodeRefreshToken(refreshToken: string) {
    return verifyToken({
      token: refreshToken,
      secretOrPublicKey: JWT_SECRET_REFRESH_TOKEN
    })
  }

  async signUp(body: AuthReqBody) {
    const member = await Member.create({
      ...body,
      password: hashPassword(body.password),
      isAdmin: false
    })
    const [accessToken, refreshToken] = await this.signAccessAndRefreshTokens({
      userId: member.id
    })

    return {
      accessToken,
      refreshToken
    }
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
    const [accessToken, refreshToken] = await this.signAccessAndRefreshTokens({
      userId: member.id
    })
    const { iat, exp } = await this.decodeRefreshToken(refreshToken)
    await RefreshToken.create({
      token: refreshToken,
      userId: member.id,
      iat,
      exp
    })

    return {
      accessToken,
      refreshToken
    }
  }
}

const userService = new UserService()

export default userService
