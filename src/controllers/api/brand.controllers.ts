import { Request, Response } from 'express'

import { BRAND_MESSAGES } from '~/constants/messages'
import { TypedRequestBody, TypedRequestParams, TypedRequestParamsBody } from '~/models/requests'
import { BrandReqBody, DeleteBrandReqParams, UpdateBrandReqParams } from '~/models/requests/Brand.requests'
import brandService from '~/services/brand.service'

// [GET] /brands
export const getBrandsController = async (_req: Request, res: Response) => {
  const brands = await brandService.getBrandsWithWatchCount()
  res.json({
    message: BRAND_MESSAGES.GET_BRANDS_SUCCESS,
    data: brands
  })
}

// [POST] /brands
export const createBrandController = async (req: TypedRequestBody<BrandReqBody>, res: Response) => {
  const newBrand = await brandService.createBrand(req.body)
  res.json({
    message: BRAND_MESSAGES.CREATE_BRAND_SUCCESS,
    data: newBrand
  })
}

// [GET] /brands/:brandId
export const getBrandController = async (req: TypedRequestParams<UpdateBrandReqParams>, res: Response) => {
  const brand = await brandService.getBrandById(req.params.brandId)
  res.json({
    message: BRAND_MESSAGES.GET_BRAND_SUCCESS,
    data: brand
  })
}

// [PUT] /brands/:brandId
export const updateBrandController = async (
  req: TypedRequestParamsBody<UpdateBrandReqParams, BrandReqBody>,
  res: Response
) => {
  const updatedBrand = await brandService.updateBrand(req.params.brandId, req.body)
  res.json({
    message: BRAND_MESSAGES.UPDATE_BRAND_SUCCESS,
    data: updatedBrand
  })
}

// [DELETE] /brands/:brandId
export const deleteBrandController = async (req: TypedRequestParams<DeleteBrandReqParams>, res: Response) => {
  await brandService.deleteBrand(req.params.brandId)
  res.json({
    message: BRAND_MESSAGES.DELETE_BRAND_SUCCESS
  })
}
