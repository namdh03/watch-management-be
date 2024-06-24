import { Router } from 'express'
import { createWatchController, getWatchController, getWatchesController } from '~/controllers/api/watch.controllers'
import { apiIsAdminMiddleware } from '~/middlewares/auth.middlewares'
import { apiAccessTokenValidator } from '~/middlewares/user.middlewares'
import { bodyWatchValidator, watchIdValidator } from '~/middlewares/watch.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const watchRouter = Router()

/**
 * Description. Get watches
 * Path: /watches
 * Method: GET
 */
watchRouter.get('/', wrapRequestHandler(getWatchesController))

/**
 * Description. Create watch
 * Path: /watches
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
watchRouter.post(
  '/',
  apiAccessTokenValidator,
  apiIsAdminMiddleware,
  bodyWatchValidator,
  wrapRequestHandler(createWatchController)
)

/**
 * Description. Get watch
 * Path: /watches/:watchId
 * Method: GET
 */
watchRouter.get('/:watchId', watchIdValidator, wrapRequestHandler(getWatchController))

export default watchRouter
