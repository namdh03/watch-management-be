import { Application } from 'express'
import homeRouter from './home.routes'

const serverRoutes = (app: Application) => {
  app.use(homeRouter)
}

export default serverRoutes
