import { Application } from 'express'
import homeRouter from './home.routes'
import watchRouter from './watch.routes'
import brandRouter from './brand.routes'
import { webDefaultErrorHandler } from '~/middlewares/error.middlewares'

const webRoutes = (app: Application) => {
  app.use(homeRouter)
  app.use('/admin/brand', brandRouter)
  app.use('/admin/watch', watchRouter)
  app.use(webDefaultErrorHandler)
}

export default webRoutes
