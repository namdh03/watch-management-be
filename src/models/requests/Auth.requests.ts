import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enum'

export interface TokenPayload extends JwtPayload {
  userId: string
  tokenType: TokenType
  exp: number
  iat: number
}

export interface AuthReqBody {
  memberName: string
  password: string
}
