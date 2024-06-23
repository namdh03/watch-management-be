import { Router } from 'express'
import { signInController, signOutController, signUpController } from '~/controllers/api/user.controllers'
import { apiRefreshTokenValidator, signInBodyValidator, signUpBodyValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const userRouter = Router()

/**
 * Description. Sign in
 * Path: /users/sign-in
 * Method: POST
 * Body: {
 *  memberName: string
 *  password: string
 * }
 */
userRouter.post('/sign-in', signInBodyValidator, wrapRequestHandler(signInController))

/**
 * Description. Sign up
 * Path: /users/sign-up
 * Method: POST
 * Body: {
 *  memberName: string,
 *  password: string,
 *  confirmPassword: string
 * }
 */
userRouter.post('/sign-up', signUpBodyValidator, wrapRequestHandler(signUpController))

/**
 * Description. Sign out
 * Path: /users/sign-out
 * Method: POST
 * Body: {
 *  refreshToken: string
 * }
 */
userRouter.post('/sign-out', apiRefreshTokenValidator, wrapRequestHandler(signOutController))

export default userRouter
