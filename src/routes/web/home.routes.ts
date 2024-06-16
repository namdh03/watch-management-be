import { Router } from 'express'
import homeControllers from '~/controllers/web/home.controllers'

const homeRouter = Router()

/**
 * Description. Get home page
 * Path: /
 * Method: GET
 */
homeRouter.get('/', homeControllers.homeView)

export default homeRouter
