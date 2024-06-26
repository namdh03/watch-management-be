import { Router } from 'express'

import authControllers from '~/controllers/web/auth.controllers'
import { guestMiddleware } from '~/middlewares/guest.middlewares'
import { signInBodyValidator, signUpBodyValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const authRouter = Router()

/**
 * Description. Get sign in page
 * Path: /sign-in
 * Method: GET
 */
authRouter.get('/sign-in', guestMiddleware, authControllers.signInView)

/**
 * Description. Sign in
 * Path: /sign-in
 * Method: POST
 */
authRouter.post('/sign-in', signInBodyValidator, wrapRequestHandler(authControllers.signIn))

/**
 * Description. Get sign up page
 * Path: /sign-up
 * Method: GET
 */
authRouter.get('/sign-up', guestMiddleware, authControllers.signUpView)

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
authRouter.post('/sign-up', signUpBodyValidator, wrapRequestHandler(authControllers.signUp))

/**
 * Description. Sign out
 * Path: /sign-out
 * Method: POST
 */
authRouter.post('/sign-out', wrapRequestHandler(authControllers.signOut))

export default authRouter
