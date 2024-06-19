import { Router } from 'express'
import memberControllers from '~/controllers/web/member.controllers'
import { isOwnerMemberNameValidator, memberNameValidator } from '~/middlewares/user.middlewares'

const memberRouter = Router()

/**
 * Description. Get members page
 * Path: /members
 * Method: GET
 */
memberRouter.get('/', memberControllers.memberView)

/**
 * Description. Get update member page
 * Path: /members/update/:memberName
 * Method: GET
 */
memberRouter.get(
  '/update/:memberName',
  memberNameValidator,
  isOwnerMemberNameValidator,
  memberControllers.updateMemberView
)

export default memberRouter
