import { Router } from 'express'
import { getBrandsController } from '~/controllers/api/brand.controllers'
import { wrapRequestHandler } from '~/utils/handlers'

const brandRouter = Router()

/**
 * Description. Get brands
 * Path: /brands
 * Method: GET
 */
brandRouter.get('/', wrapRequestHandler(getBrandsController))

export default brandRouter
