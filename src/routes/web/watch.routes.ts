import { Router } from 'express'
import watchController from '~/controllers/web/watch.controller'

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
 *
 * }
 * */
watchRouter.post('/create', watchController.createWatch)

export default watchRouter
