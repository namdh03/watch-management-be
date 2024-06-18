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
const updateBrandView = async (req: TypedRequestParams<ViewBrandReqParams>, res: Response) => {
  const brand = await brandService.getBrandByName({ brandName: req.params.brandName })
  res.render('update-brand', { brand })
}

// [PUT] /admin/brand/update/:brandId
const updateBrand = async (req: TypedRequestParamsBody<UpdateBrandReqParams, BrandReqBody>, res: Response) => {
  await brandService.updateBrand(req.params.brandId, req.body)
  res.flash('success', BRAND_MESSAGES.UPDATE_BRAND_SUCCESSFULLY)
  res.redirect('/admin/brand')
}

// [DELETE] /admin/brand/delete/:brandId
const deleteBrand = async (req: TypedRequestParams<DeleteBrandReqParams>, res: Response) => {
  const { brandId } = req.params
  const result = await brandService.deleteBrand(brandId)

  if (!result.deletedCount) {
    res.flash('error', BRAND_MESSAGES.BRAND_ID_DOES_NOT_EXIST)
    return res.redirect('/admin/brand')
  }

  res.flash('success', BRAND_MESSAGES.DELETE_BRAND_SUCCESSFULLY)
  res.redirect('/admin/brand')
}

export default {
  brandsView,
  createBrandView,
  createBrand,
  updateBrandView,
  updateBrand,
  deleteBrand
}
