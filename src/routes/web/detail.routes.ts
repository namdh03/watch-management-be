import { Router } from 'express'
import detailControllers from '~/controllers/web/detail.controllers'

const detailRouter = Router()

/**
 * Description. Get watch detail page
 * Path: /watch/:watchId
 * Method: GET
 */
detailRouter.get('/watch/:watchId', detailControllers.watchDetailView)

export default detailRouter
