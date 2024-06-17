import { ParamsDictionary } from 'express-serve-static-core'

export interface WatchReqBody {
  watchName: string
  image: string
  price: number
  automatic: boolean
  watchDescription: string
  brandId: string
}

export interface UpdateWatchReqParams extends ParamsDictionary {
  watchId: string
}
