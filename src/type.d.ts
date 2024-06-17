import { Brand } from '~/models/schemas/Brand.schema'
import { Request } from 'express'

declare module 'express' {
  interface Request {
    page?: string
    brand?: Brand
  }
}
