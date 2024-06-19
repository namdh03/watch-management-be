import { Application } from 'express'
import { accessTokenValidator } from '~/middlewares/user.middlewares'
import { authMiddleware, isAdminMiddleware } from '~/middlewares/auth.middlewares'
import { webDefaultErrorHandler } from '~/middlewares/error.middlewares'
import authRouter from './auth.routes'
import homeRouter from './home.routes'
import userRouter from './user.routes'
import memberRouter from './member.routes'
import brandRouter from './brand.routes'
import watchRouter from './watch.routes'
import searchRouter from './search.routes'
import commentRouter from './comment.routes'
import detailRouter from './detail.routes'

const webRoutes = (app: Application) => {
  app.use(authRouter)
  app.use(homeRouter)
  app.use(detailRouter)
  app.use('/search', searchRouter)
  app.use('/user', accessTokenValidator, authMiddleware, userRouter)
  app.use('/comment', accessTokenValidator, authMiddleware, commentRouter)
  app.use('/admin/members', accessTokenValidator, authMiddleware, isAdminMiddleware, memberRouter)
  app.use('/admin/brands', accessTokenValidator, authMiddleware, isAdminMiddleware, brandRouter)
  app.use('/admin/watches', accessTokenValidator, authMiddleware, isAdminMiddleware, watchRouter)
  app.use(webDefaultErrorHandler)
}

export default webRoutes
