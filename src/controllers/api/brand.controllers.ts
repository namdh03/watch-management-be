import { Request, Response } from 'express'
import { BRAND_MESSAGES } from '~/constants/messages'
import { TypedRequestBody } from '~/models/requests'
import { BrandReqBody } from '~/models/requests/Brand.requests'
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
