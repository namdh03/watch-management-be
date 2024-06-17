import { Router } from 'express'
import watchController from '~/controllers/web/watch.controllers'
import { createWatchValidator } from '~/middlewares/watch.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const watchRouter = Router()

/**
 * Description. Get watches page
 * Path: /admin/watch
 * Method: GET
 */
watchRouter.get('/', watchController.watchesView)

/**
 * Description. Get create watch page
 * Path: /admin/watch/create
 * Method: GET
 * */
watchRouter.get('/create', watchController.createWatchView)

/**
 * Description. Create watch
 * Path: /admin/watch/create
 * Method: POST
 * Body: {
 *  watchName: string
 *  image: string
 *  price: number
 *  automatic: boolean
 *  watchDescription: string
 *  brandId: string
 * }
 * */
watchRouter.post('/create', createWatchValidator, wrapRequestHandler(watchController.createWatch))

export default watchRouter
