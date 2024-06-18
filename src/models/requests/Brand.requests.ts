import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface BrandReqBody {
  brandName: string
}

export interface BrandNameReqParams extends ParamsDictionary {
  brandName: string
}

export interface DeleteBrandReqParams extends ParamsDictionary {
  brandId: string
}
