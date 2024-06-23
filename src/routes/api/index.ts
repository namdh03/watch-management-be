import { Application } from 'express'
import userRouter from './user.routes'
import { apiDefaultErrorHandler } from '~/middlewares/error.middlewares'

const apiRoutes = (app: Application) => {
  app.use('/users', userRouter)
  app.use(apiDefaultErrorHandler)
}

export default apiRoutes
