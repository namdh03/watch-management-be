import { Application } from 'express'
import authRouter from './auth.routes'
import homeRouter from './home.routes'
import watchRouter from './watch.routes'
import brandRouter from './brand.routes'
import { webDefaultErrorHandler } from '~/middlewares/error.middlewares'
import { verifyAccessToken } from '~/middlewares/user.middlewares'
import { authMiddleware, isAdminMiddleware } from '~/middlewares/auth.middlewares'
import memberRouter from './member.routes'

const webRoutes = (app: Application) => {
  app.use(authRouter)
  app.use(homeRouter)
  app.use('/admin/members', verifyAccessToken, authMiddleware, isAdminMiddleware, memberRouter)
  app.use('/admin/brands', verifyAccessToken, authMiddleware, isAdminMiddleware, brandRouter)
  app.use('/admin/watches', verifyAccessToken, authMiddleware, isAdminMiddleware, watchRouter)
  app.use(webDefaultErrorHandler)
}

export default webRoutes
