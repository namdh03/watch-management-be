import { Router } from 'express'
import authControllers from '~/controllers/web/auth.controllers'

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

export default authRouter
