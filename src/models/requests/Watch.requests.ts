import { Request } from 'express'

export interface WatchReqBody {
  watchName: string
  image: string
  price: number
  automatic: boolean
  watchDescription: string
  brandId: string
}
