import { Application } from 'express'
import authRouter from './auth.routes'
import homeRouter from './home.routes'
import watchRouter from './watch.routes'
import brandRouter from './brand.routes'
import { webDefaultErrorHandler } from '~/middlewares/error.middlewares'
import { verifyAccessToken } from '~/middlewares/auth.middlewares'

const webRoutes = (app: Application) => {
  app.use(authRouter)
  app.use(homeRouter)
  app.use('/admin/brand', verifyAccessToken, brandRouter)
  app.use('/admin/watch', verifyAccessToken, watchRouter)
  app.use(webDefaultErrorHandler)
}

export default webRoutes
