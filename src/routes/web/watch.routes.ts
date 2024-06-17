import { Router } from 'express'
import watchController from '~/controllers/web/watch.controllers'
import { checkExistedWatchIdValidator, watchValidator } from '~/middlewares/watch.middlewares'
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
watchRouter.post('/create', watchValidator, wrapRequestHandler(watchController.createWatch))

/**
 * Description. Get update watch page
 * Path: /admin/watch/update/:watchId
 * Method: GET
 * */
watchRouter.get('/update/:watchId', checkExistedWatchIdValidator, wrapRequestHandler(watchController.updateWatchView))

/**
 * Description. Update watch
 * Path: /admin/watch/update/:watchId
 * Method: PUT
 * */
watchRouter.put(
  '/update/:watchId',
  checkExistedWatchIdValidator,
  watchValidator,
  wrapRequestHandler(watchController.updateWatch)
)

export default watchRouter
