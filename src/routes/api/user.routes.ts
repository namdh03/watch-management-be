import { Router } from 'express'
import {
  meController,
  signInController,
  signOutController,
  signUpController,
  updateMeController
} from '~/controllers/api/user.controllers'
import {
  apiAccessTokenValidator,
  apiRefreshTokenValidator,
  signInBodyValidator,
  signUpBodyValidator,
  updateMemberValidator
} from '~/middlewares/user.middlewares'
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
userRouter.post('/sign-out', apiAccessTokenValidator, apiRefreshTokenValidator, wrapRequestHandler(signOutController))

/**
 * Description. Get me
 * Path: /users/me
 * Method: GET
 */
userRouter.get('/me', apiAccessTokenValidator, wrapRequestHandler(meController))

/**
 * Description. Update me
 * Path: /users/me
 * Method: PUT
 * Body: {
 *  memberName: string
 *  name: string
 *  yob: number
 * }
 */
userRouter.put('/me', apiAccessTokenValidator, updateMemberValidator, wrapRequestHandler(updateMeController))

export default userRouter
