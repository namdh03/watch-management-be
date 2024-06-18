import { Request } from 'express'
import { TokenPayload } from './models/requests/Auth.requests'

declare module 'express' {
  interface Request {
    decode_authorization?: TokenPayload
  }
}
