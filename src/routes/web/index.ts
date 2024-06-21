import { Application } from 'express'
import { accessTokenValidator, userMiddleware } from '~/middlewares/user.middlewares'
import memberControllers from '~/controllers/web/member.controllers'
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
import { wrapRequestHandler } from '~/utils/handlers'

const webRoutes = (app: Application) => {
  app.use(accessTokenValidator, userMiddleware)
  app.use(authRouter)
  app.use(homeRouter)
  app.use(detailRouter)
  app.use('/search', searchRouter)
  app.use('/user', authMiddleware, userRouter)
  app.use('/comment', authMiddleware, commentRouter)
  app.get('/admin', wrapRequestHandler(memberControllers.memberView))
  app.use('/admin/members', authMiddleware, isAdminMiddleware, memberRouter)
  app.use('/admin/brands', authMiddleware, isAdminMiddleware, brandRouter)
  app.use('/admin/watches', authMiddleware, isAdminMiddleware, watchRouter)
  app.use(webDefaultErrorHandler)
}

export default webRoutes
