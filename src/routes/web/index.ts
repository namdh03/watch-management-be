import { Application, Request, Response } from 'express'
import { webAccessTokenValidator, userMiddleware } from '~/middlewares/user.middlewares'
import memberControllers from '~/controllers/web/member.controllers'
import { authMiddleware, webIsAdminMiddleware } from '~/middlewares/auth.middlewares'
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
  app.use(webAccessTokenValidator, userMiddleware)
  app.use(authRouter)
  app.use(homeRouter)
  app.use(detailRouter)
  app.use('/search', searchRouter)
  app.use('/user', authMiddleware, userRouter)
  app.use('/comment', authMiddleware, commentRouter)
  app.get('/admin', wrapRequestHandler(memberControllers.memberView))
  app.use('/admin/members', authMiddleware, webIsAdminMiddleware, memberRouter)
  app.use('/admin/brands', authMiddleware, webIsAdminMiddleware, brandRouter)
  app.use('/admin/watches', authMiddleware, webIsAdminMiddleware, watchRouter)
  app.use(webDefaultErrorHandler)
  // 404 Not Found
  app.get('*', (_req: Request, res: Response) => {
    res.render('404', { layout: false })
  })
}

export default webRoutes
