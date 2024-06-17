import { Brand } from '~/models/schemas/Brand.schema'
import { Request } from 'express'

declare module 'express' {
  interface Request {
    brand?: Brand
  }
}
