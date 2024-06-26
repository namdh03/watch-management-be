import { JwtPayload } from 'jsonwebtoken'

import { TokenType } from '~/constants/enum'

export interface TokenPayload extends JwtPayload {
  userId: string
  isAdmin: boolean
  tokenType: TokenType
  exp: number
  iat: number
}

export interface SignInReqBody {
  memberName: string
  password: string
}

export interface SignUpReqBody {
  memberName: string
  password: string
  confirmPassword: string
}

export interface SignOutReqBody {
  refreshToken: string
}
