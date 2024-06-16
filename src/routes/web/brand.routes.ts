import { Router } from 'express'
import brandControllers from '~/controllers/web/brand.controllers'
import { createBrandValidator } from '~/middlewares/brand.middlewares'
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
brandRouter.post('/create', createBrandValidator, wrapRequestHandler(brandControllers.createBrand))

/**
 * Description. Get update brand page
 * Path: /admin/brand/update/:id
 * Method: GET
 */
brandRouter.get('/update/:id', wrapRequestHandler(brandControllers.updateBrandView))

export default brandRouter
