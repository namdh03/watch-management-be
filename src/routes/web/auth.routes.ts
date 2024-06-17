import { Router } from 'express'
import authControllers from '~/controllers/web/auth.controllers'
import { registerValidator } from '~/middlewares/user.middlewares'

const authRouter = Router()

/**
 * Description. Get sign in page
 * Path: /sign-in
 * Method: GET
 */
authRouter.get('/sign-in', authControllers.signInView)

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
authRouter.post('/sign-up', registerValidator, authControllers.signUp)

export default authRouter
