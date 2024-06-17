import { Router } from 'express'
import authControllers from '~/controllers/web/auth.controllers'

const authRouter = Router()

/**
 * Description. Get sign in page
 * Path: /sign-in
 * Method: GET
 */
authRouter.get('/sign-in', authControllers.signInView)

export default authRouter
