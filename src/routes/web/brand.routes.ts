import { Router } from 'express'
import brandControllers from '~/controllers/web/brand.controllers'
import {
  bodyBrandValidator,
  brandNameValidator,
  checkExistedBrandIdValidator,
  brandIdValidator
} from '~/middlewares/brand.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const brandRouter = Router()

/**
 * Description. Get brands page
 * Path: /admin/watch
 * Method: GET
 */
brandRouter.get('/', brandControllers.brandsView)

/**
 * Description. Get create brand page
 * Path: /admin/brand/create
 * Method: GET
 */
brandRouter.get('/create', brandControllers.createBrandView)

/**
 * Description. Create brand
 * Path: /admin/brand/create
 * Method: POST
 * Body: {
 *  brandName: string
 * }
 */
brandRouter.post('/create', bodyBrandValidator, wrapRequestHandler(brandControllers.createBrand))

/**
 * Description. Get update brand page
 * Path: /admin/brand/update/:brandName
 * Method: GET
 */
brandRouter.get('/update/:brandName', brandNameValidator, wrapRequestHandler(brandControllers.updateBrandView))

/**
 * Description. Update brand
 * Path: /admin/brand/update/:brandId
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
 * Path: /admin/brand/delete/:brandId
 * Method: DELETE
 * Params: {
 *  id: string
 * }
 */
brandRouter.delete('/delete/:brandId', checkExistedBrandIdValidator, brandControllers.deleteBrand)

export default brandRouter
