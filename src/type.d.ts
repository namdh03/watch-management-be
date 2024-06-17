import { Request } from 'express'
import { Brand } from '~/models/schemas/Brand.schema'
import { Watch } from '~/models/schemas/Watch.schema'

declare module 'express' {
  interface Request {
    page?: string
    brand?: Brand
    watch?: Watch
  }
}
