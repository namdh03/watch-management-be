import { Application } from 'express'
import userRouter from './user.routes'

const apiRoutes = (app: Application) => {
  app.use('/users', userRouter)

  // app.use(webDefaultErrorHandler)
}

export default apiRoutes
