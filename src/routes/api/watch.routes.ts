import { Router } from 'express'
import { getWatchesController } from '~/controllers/api/watch.controllers'
import { wrapRequestHandler } from '~/utils/handlers'

const watchRouter = Router()

/**
 * Description. Get watches
 * Path: /watches
 * Method: GET
 */
watchRouter.get('/', wrapRequestHandler(getWatchesController))

export default watchRouter
