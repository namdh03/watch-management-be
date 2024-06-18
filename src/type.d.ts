import { Request } from 'express'
import { Member } from '~/models/schemas/Member.schema'
import { TokenPayload } from './models/requests/Auth.requests'

declare module 'express' {
  interface Request {
    decode_authorization?: TokenPayload
    member?: Member
  }
}
