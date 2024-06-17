import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface BrandReqBody {
  brandName: string
}

export interface BrandReqParams extends ParamsDictionary {
  brandName: string
}
