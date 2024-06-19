import { Router } from 'express'
import userControllers from '~/controllers/web/user.controllers'
import { isOwnerMemberNameValidator, memberNameValidator, updateMemberValidator } from '~/middlewares/user.middlewares'
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
 * Path: /:memberName
 * Method: PUT
 * Body: {
 *  memberName: string
 * }
 */
userRouter.put(
  '/:memberName',
  memberNameValidator,
  updateMemberValidator,
  isOwnerMemberNameValidator,
  wrapRequestHandler(userControllers.updateUser)
)

export default userRouter
