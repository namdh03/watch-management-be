import { TokenType } from '~/constants/enum'
import {
  ACCESS_TOKEN_EXPIRES_IN,
  JWT_SECRET_ACCESS_TOKEN,
  JWT_SECRET_REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRES_IN
} from '~/constants/env'
import { AuthReqBody } from '~/models/requests/Auth.requests'
import Member from '~/models/schemas/Member.schema'
import { hashPassword } from '~/utils/bcrypt'
import { signToken } from '~/utils/jwt'

class UserService {
  private signAccessToken({ user_id }: { user_id: string }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      privateKey: JWT_SECRET_ACCESS_TOKEN,
      options: {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }

  private signRefreshToken({ user_id, exp }: { user_id: string; exp?: number }) {
    const token = {
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
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

  private signAccessAndRefreshTokens({ user_id, exp }: { user_id: string; exp?: number }) {
    return Promise.all([
      this.signAccessToken({
        user_id
      }),
      this.signRefreshToken({
        user_id,
        exp
      })
    ])
  }

  async registerUser(body: AuthReqBody) {
    const member = await Member.create({
      ...body,
      password: hashPassword(body.password),
      isAdmin: false
    })
    const [accessToken, refreshToken] = await this.signAccessAndRefreshTokens({
      user_id: member.id
    })

    return {
      accessToken,
      refreshToken
    }
  }

  async checkExistedMemberName(memberName: string) {
    return await Member.findOne({ memberName })
  }
}

const userService = new UserService()

export default userService
