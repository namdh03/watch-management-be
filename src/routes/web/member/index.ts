import { Application } from 'express'
import homeRouter from './home.routes'

const webMemberRoutes = (app: Application) => {
  app.use(homeRouter)
}

export default webMemberRoutes
