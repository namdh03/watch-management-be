import { Router } from 'express'
import { signInController } from '~/controllers/api/user.controllers'
import { signInBodyValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const userRouter = Router()

/**
 * Description. Sign in
 * Path: /api/sign-in
 * Method: POST
 * Body: {
 *  memberName: string
 *  password: string
 * }
 */
userRouter.post('/sign-in', signInBodyValidator, wrapRequestHandler(signInController))

export default userRouter
