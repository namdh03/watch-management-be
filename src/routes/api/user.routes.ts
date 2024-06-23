import { Router } from 'express'
import { signInController, signUpController } from '~/controllers/api/user.controllers'
import { signInBodyValidator, signUpBodyValidator } from '~/middlewares/user.middlewares'
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

/**
 * Description. Sign up
 * Path: /sign-up
 * Method: POST
 * Body: {
 *  memberName: string,
 *  password: string,
 *  confirmPassword: string
 * }
 */
userRouter.post('/sign-up', signUpBodyValidator, wrapRequestHandler(signUpController))

export default userRouter
