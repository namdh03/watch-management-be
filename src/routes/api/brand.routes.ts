import { Router } from 'express'
import {
  createBrandController,
  getBrandController,
  getBrandsController,
  updateBrandController
} from '~/controllers/api/brand.controllers'
import { bodyBrandValidator, brandIdValidator } from '~/middlewares/brand.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

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
brandRouter.post('/', bodyBrandValidator, wrapRequestHandler(createBrandController))

/**
 * Description. Get brand
 * Path: /brands/:brandId
 * Method: GET
 */
brandRouter.get('/:brandId', brandIdValidator, wrapRequestHandler(getBrandController))

/**
 * Description. Update brand
 * Path: /brands/:brandId
 * Method: PUT
 */
brandRouter.put('/:brandId', brandIdValidator, bodyBrandValidator, wrapRequestHandler(updateBrandController))

export default brandRouter
