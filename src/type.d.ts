import { Request } from 'express'
import { TokenPayload } from '~/models/requests/Auth.requests'
import { MemberDocument } from '~/models/schemas/Member.schema'

declare module 'express' {
  interface Request {
    decodeAuthorization?: TokenPayload
    decodeRefreshToken?: TokenPayload
    user?: MemberDocument
  }
}
