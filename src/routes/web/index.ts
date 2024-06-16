import { Application } from 'express'
import homeRouter from './home.routes'
import watchRouter from './watch.routes'

const webRoutes = (app: Application) => {
  app.use(homeRouter)
  app.use('/admin/watch', watchRouter)
}

export default webRoutes
