import { Router } from 'express'

import homeControllers from '~/controllers/web/home.controllers'
import { wrapRequestHandler } from '~/utils/handlers'

const homeRouter = Router()

/**
 * Description. Get home page
 * Path: /
 * Method: GET
 */
homeRouter.get('/', wrapRequestHandler(homeControllers.homeView))

export default homeRouter
