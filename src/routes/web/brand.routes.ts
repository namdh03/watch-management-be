import { Router } from 'express'
import brandControllers from '~/controllers/web/brand.controllers'
import { bodyBrandValidator, brandNameValidator, brandIdValidator } from '~/middlewares/brand.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const brandRouter = Router()

/**
 * Description. Get brands page
 * Path: /admin/brands
 * Method: GET
 */
brandRouter.get('/', wrapRequestHandler(brandControllers.brandsView))

/**
 * Description. Get create brand page
 * Path: /admin/brands/create
 * Method: GET
 */
brandRouter.get('/create', brandControllers.createBrandView)

/**
 * Description. Create brand
 * Path: /admin/brands/create
 * Method: POST
 * Body: {
 *  brandName: string
 * }
 */
brandRouter.post('/create', bodyBrandValidator, wrapRequestHandler(brandControllers.createBrand))

/**
 * Description. Get update brand page
 * Path: /admin/brands/update/:brandName
 * Method: GET
 */
brandRouter.get('/update/:brandName', brandNameValidator, wrapRequestHandler(brandControllers.updateBrandView))

/**
 * Description. Update brand
 * Path: /admin/brands/update/:brandId
 * Method: PUT
 * Body: {
 *  brandName: string
 * }
 */
brandRouter.put(
  '/update/:brandId',
  brandIdValidator,
  bodyBrandValidator,
  wrapRequestHandler(brandControllers.updateBrand)
)

/**
 * Description. Delete brand
 * Path: /admin/brands/delete/:brandId
 * Method: DELETE
 */
brandRouter.delete('/delete/:brandId', brandIdValidator, wrapRequestHandler(brandControllers.deleteBrand))

export default brandRouter
