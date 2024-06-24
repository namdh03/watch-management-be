import { Request, Response } from 'express'
import { BRAND_MESSAGES } from '~/constants/messages'
import brandService from '~/services/brand.service'

// [GET] /brands
export const getBrandsController = async (_req: Request, res: Response) => {
  const brands = await brandService.getBrandsWithWatchCount()
  res.json({
    message: BRAND_MESSAGES.GET_BRANDS_SUCCESS,
    data: brands
  })
}
