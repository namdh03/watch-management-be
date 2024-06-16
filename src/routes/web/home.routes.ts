import { Router } from 'express'
import homeController from '~/controllers/web/home.controller'

const homeRouter = Router()

/**
 * Description. Get home page
 * Path: /
 * Method: GET
 */
homeRouter.get('/', homeController.homeView)

export default homeRouter
