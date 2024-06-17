import { Request } from 'express'
import { Brand } from '~/models/schemas/Brand.schema'
import { Watch } from '~/models/schemas/Watch.schema'
import { TokenPayload } from './models/requests/Auth.requests'

declare module 'express' {
  interface Request {
    page?: string
    brand?: Brand
    watch?: Watch
    decode_authorization?: TokenPayload
  }
}
