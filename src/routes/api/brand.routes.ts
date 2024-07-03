import { Router } from 'express'

import {
  createBrandController,
  deleteBrandController,
  getBrandController,
  getBrandsController,
  updateBrandController
} from '~/controllers/api/brand.controllers'
import { bodyBrandValidator, brandIdValidator } from '~/middlewares/brand.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
import { apiIsAdminMiddleware } from '~middlewares/auth.middlewares'
import { apiAccessTokenValidator } from '~middlewares/user.middlewares'

const brandRouter = Router()

/**
 * Description. Get brands
 * Path: /brands
 * Method: GET
 */
brandRouter.get('/', wrapRequestHandler(getBrandsController))

/**
 * Description. Create brand
 * Path: /brands
 * Method: POST
 * Body: {
 *  brandName: string
 * }
 */
brandRouter.post(
  '/',
  apiAccessTokenValidator,
  apiIsAdminMiddleware,
  bodyBrandValidator,
  wrapRequestHandler(createBrandController)
)

/**
 * Description. Get brand
 * Path: /brands/:brandId
 * Method: GET
 */
brandRouter.get(
  '/:brandId',
  apiAccessTokenValidator,
  apiIsAdminMiddleware,
  brandIdValidator,
  wrapRequestHandler(getBrandController)
)

/**
 * Description. Update brand
 * Path: /brands/:brandId
 * Method: PUT
 * Body: {
 *  brandName: string
 * }
 */
brandRouter.put(
  '/:brandId',
  apiAccessTokenValidator,
  apiIsAdminMiddleware,
  brandIdValidator,
  bodyBrandValidator,
  wrapRequestHandler(updateBrandController)
)

/**
 * Description. Delete brand
 * Path: /brands/:brandId
 * Method: DELETE
 */
brandRouter.delete(
  '/:brandId',
  apiAccessTokenValidator,
  apiIsAdminMiddleware,
  brandIdValidator,
  wrapRequestHandler(deleteBrandController)
)

export default brandRouter
