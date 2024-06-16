import { Request, Response } from 'express'
import { TypedRequestBody } from '~/models/requests'
import { BrandReqBody } from '~/models/requests/Brand.requests'
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
  res.redirect('/admin/brand')
}

// [GET] /admin/brand/update/:id
const updateBrandView = async (req: Request, res: Response) => {
  const { brandName } = req.params
  const brand = await brandService.getBrandByName({ brandName })
  res.render('update-brand', { brand })
}

export default {
  brandsView,
  createBrandView,
  createBrand,
  updateBrandView
}
