import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enum'

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  exp: number
  iat: number
}

export interface AuthReqBody {
  memberName: string
  password: string
}
