import { Request, Response } from 'express'
import { BRAND_MESSAGES } from '~/constants/messages'
import { TypedRequestBody, TypedRequestParams, TypedRequestParamsBody } from '~/models/requests'
import {
  BrandReqBody,
  DeleteBrandReqParams,
  UpdateBrandReqParams,
  ViewBrandReqParams
} from '~/models/requests/Brand.requests'
import brandService from '~/services/brand.service'

// [GET] /admin/brands
const brandsView = async (_req: Request, res: Response) => {
  const brands = await brandService.getBrandsWithWatchCount()
  res.render('brands', { title: 'Node.js | Brands', layout: 'admin', brands })
}

// [GET] /admin/brands/create
const createBrandView = (_req: Request, res: Response) => {
  res.render('create-brand', { title: 'Node.js | Create Brand', layout: 'admin' })
}

// [POST] /admin/brands/create
const createBrand = async (req: TypedRequestBody<BrandReqBody>, res: Response) => {
  await brandService.createBrand(req.body)
  res.flash('success', BRAND_MESSAGES.CREATE_BRAND_SUCCESSFULLY)
  res.redirect('/admin/brands')
}

// [GET] /admin/brands/update/:brandName
const updateBrandView = async (req: TypedRequestParams<ViewBrandReqParams>, res: Response) => {
  const brand = await brandService.getBrandByName(req.params.brandName)
  res.render('update-brand', { title: `Node.js | Update Brand | ${brand.brandName}`, layout: 'admin', brand })
}

// [PUT] /admin/brands/update/:brandId
const updateBrand = async (req: TypedRequestParamsBody<UpdateBrandReqParams, BrandReqBody>, res: Response) => {
  await brandService.updateBrand(req.params.brandId, req.body)
  res.flash('success', BRAND_MESSAGES.UPDATE_BRAND_SUCCESSFULLY)
  res.redirect('/admin/brands')
}

// [DELETE] /admin/brands/delete/:brandId
const deleteBrand = async (req: TypedRequestParams<DeleteBrandReqParams>, res: Response) => {
  await brandService.deleteBrand(req.params.brandId)
  res.flash('success', BRAND_MESSAGES.DELETE_BRAND_SUCCESSFULLY)
  res.redirect('/admin/brands')
}

export default {
  brandsView,
  createBrandView,
  createBrand,
  updateBrandView,
  updateBrand,
  deleteBrand
}
