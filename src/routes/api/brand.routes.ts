import { Router } from 'express'
import { createBrandController, getBrandsController } from '~/controllers/api/brand.controllers'
import { bodyBrandValidator } from '~/middlewares/brand.middlewares'
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

export default brandRouter
