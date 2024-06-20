import { Router } from 'express'
import userControllers from '~/controllers/web/user.controllers'
import {
  changePasswordValidator,
  isOwnerMemberNameValidator,
  memberNameValidator,
  updateMemberValidator
} from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const userRouter = Router()

/**
 * Description. Get user page
 * Path: /:memberName
 * Method: GET
 */
userRouter.get(
  '/:memberName',
  memberNameValidator,
  isOwnerMemberNameValidator,
  wrapRequestHandler(userControllers.userView)
)

/**
 * Description. Update user
 * Path: /
 * Method: PUT
 * Body: {
 *  memberName: string
 *  name: string
 *  yob: number
 * }
 */
userRouter.put('/', updateMemberValidator, wrapRequestHandler(userControllers.updateUser))

/**
 * Description. Change password
 * Path: /change-password
 * Method: PUT
 * Body: {
 *   oldPassword: string,
 *   password: string,
 *   confirmPassword: string
 * }
 */
userRouter.put('/change-password', changePasswordValidator, wrapRequestHandler(userControllers.changePassword))

export default userRouter
