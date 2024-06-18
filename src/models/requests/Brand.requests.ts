import { ParamsDictionary } from 'express-serve-static-core'

export interface BrandReqBody {
  brandName: string
}

export interface ViewBrandReqParams extends ParamsDictionary {
  brandName: string
}

export interface UpdateBrandReqParams extends ParamsDictionary {
  brandId: string
}

export interface DeleteBrandReqParams extends ParamsDictionary {
  brandId: string
}
