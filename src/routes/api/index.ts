import { Application } from 'express'

import { apiIsAdminMiddleware, apiIsUserMiddleware } from '~/middlewares/auth.middlewares'
import { apiDefaultErrorHandler } from '~/middlewares/error.middlewares'
import { apiAccessTokenValidator } from '~/middlewares/user.middlewares'

import brandRouter from './brand.routes'
import commentRouter from './comment.routes'
import searchRouter from './search.routes'
import userRouter from './user.routes'
import watchRouter from './watch.routes'

const apiRoutes = (app: Application) => {
  app.use('/users', userRouter)
  app.use('/brands', apiAccessTokenValidator, apiIsAdminMiddleware, brandRouter)
  app.use('/watches', watchRouter)
  app.use('/comments', apiAccessTokenValidator, apiIsUserMiddleware, commentRouter)
  app.use('/search', searchRouter)
  app.use(apiDefaultErrorHandler)
}

export default apiRoutes
