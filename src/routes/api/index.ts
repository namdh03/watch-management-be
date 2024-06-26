import { Application } from 'express'
import userRouter from './user.routes'
import { apiDefaultErrorHandler } from '~/middlewares/error.middlewares'
import brandRouter from './brand.routes'
import { apiAccessTokenValidator } from '~/middlewares/user.middlewares'
import { apiIsAdminMiddleware } from '~/middlewares/auth.middlewares'
import watchRouter from './watch.routes'
import commentRouter from './comment.routes'
import searchRouter from './search.routes'

const apiRoutes = (app: Application) => {
  app.use('/users', userRouter)
  app.use('/brands', apiAccessTokenValidator, apiIsAdminMiddleware, brandRouter)
  app.use('/watches', watchRouter)
  app.use('/comments', apiAccessTokenValidator, commentRouter)
  app.use('/search', searchRouter)
  app.use(apiDefaultErrorHandler)
}

export default apiRoutes
