import { Application, Request, Response } from 'express'

import memberControllers from '~/controllers/web/member.controllers'
import { authMiddleware, webIsAdminMiddleware } from '~/middlewares/auth.middlewares'
import { webDefaultErrorHandler } from '~/middlewares/error.middlewares'
import { userMiddleware, webAccessTokenValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

import authRouter from './auth.routes'
import brandRouter from './brand.routes'
import commentRouter from './comment.routes'
import detailRouter from './detail.routes'
import homeRouter from './home.routes'
import memberRouter from './member.routes'
import searchRouter from './search.routes'
import userRouter from './user.routes'
import watchRouter from './watch.routes'

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
