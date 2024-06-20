import { Router } from 'express'
import detailControllers from '~/controllers/web/detail.controllers'
import { wrapRequestHandler } from '~/utils/handlers'

const detailRouter = Router()

/**
 * Description. Get watch detail page
 * Path: /watch/:watchId
 * Method: GET
 */
detailRouter.get('/watch/:watchId', wrapRequestHandler(detailControllers.watchDetailView))

export default detailRouter
