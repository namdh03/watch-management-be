import { Router } from 'express'
import userControllers from '~/controllers/web/user.controllers'
import { isOwnerMemberNameValidator, memberNameValidator } from '~/middlewares/user.middlewares'

const userRouter = Router()

/**
 * Description. Get user page
 * Path: /:memberName
 * Method: GET
 */
userRouter.get('/:memberName', memberNameValidator, isOwnerMemberNameValidator, userControllers.userView)

export default userRouter
