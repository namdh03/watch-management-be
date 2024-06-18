import { Router } from 'express'
import authControllers from '~/controllers/web/auth.controllers'
import { loginValidator, registerValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const authRouter = Router()

/**
 * Description. Get sign in page
 * Path: /sign-in
 * Method: GET
 */
authRouter.get('/sign-in', authControllers.signInView)

/**
 * Description. Sign in
 * Path: /sign-in
 * Method: POST
 */
authRouter.post('/sign-in', loginValidator, wrapRequestHandler(authControllers.signIn))

/**
 * Description. Get sign up page
 * Path: /sign-up
 * Method: GET
 */
authRouter.get('/sign-up', authControllers.signUpView)

/**
 * Description. Sign up
 * Path: /sign-up
 * Method: POST
 */
authRouter.post('/sign-up', registerValidator, wrapRequestHandler(authControllers.signUp))

export default authRouter
