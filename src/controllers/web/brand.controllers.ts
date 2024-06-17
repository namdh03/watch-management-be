import { Request, Response } from 'express'
import { BRAND_MESSAGES } from '~/constants/messages'
import { TypedRequestBody, TypedRequestParams, TypedRequestParamsBody } from '~/models/requests'
import { BrandReqBody, BrandReqParams } from '~/models/requests/Brand.requests'
import brandService from '~/services/brand.service'

// [GET] /admin/brand
const brandsView = async (_req: Request, res: Response) => {
  const brands = await brandService.getBrands()
  res.render('brand', { brands })
}

// [GET] /admin/brand/create
const createBrandView = (_req: Request, res: Response) => {
  res.render('create-brand')
}

// [POST] /admin/brand/create
const createBrand = async (req: TypedRequestBody<BrandReqBody>, res: Response) => {
  await brandService.createBrand(req.body)
  res.flash('success', BRAND_MESSAGES.CREATE_BRAND_SUCCESSFULLY)
  res.redirect('/admin/brand')
}

// [GET] /admin/brand/update/:brandName
const updateBrandView = async (req: TypedRequestParams<BrandReqParams>, res: Response) => {
  const brand = req.brand
  res.render('update-brand', { brand })
}

// [PUT] /admin/brand/update/:brandName
const updateBrand = async (req: TypedRequestParamsBody<BrandReqParams, BrandReqBody>, res: Response) => {
  const brand = req.brand
  await brandService.updateBrand(brand._id, req.body)
  res.flash('success', BRAND_MESSAGES.UPDATE_BRAND_SUCCESSFULLY)
  res.redirect('/admin/brand')
}

export default {
  brandsView,
  createBrandView,
  createBrand,
  updateBrandView,
  updateBrand
}
