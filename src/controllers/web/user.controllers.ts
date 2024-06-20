import { Response } from 'express'
import { USER_MESSAGES } from '~/constants/messages'
import { TypedRequestBody, TypedRequestParams } from '~/models/requests'
import { ChangePasswordReqBody, MemberReqBody, MemberReqParams } from '~/models/requests/Member.requests'
import { MemberDocument } from '~/models/schemas/Member.schema'
import userService from '~/services/user.service'

// [GET] /:memberName
const userView = async (req: TypedRequestParams<MemberReqParams>, res: Response) => {
  const member = req.user as MemberDocument
  res.render('user', { member })
}

// [PUT] /
const updateUser = async (req: TypedRequestBody<MemberReqBody>, res: Response) => {
  const user = req.user as MemberDocument
  await userService.updateMember(user.id, user.memberName, req.body)
  res.flash('success', USER_MESSAGES.UPDATE_PROFILE_SUCCESS)
  res.redirect(`/user/${req.body.memberName}`)
}

// [PUT] /change-password
const changePassword = async (req: TypedRequestBody<ChangePasswordReqBody>, res: Response) => {
  const user = req.user as MemberDocument
  await userService.changePassword(user.id, req.body)
  res.flash('success', USER_MESSAGES.CHANGE_PASSWORD_SUCCESS)
  res.redirect(`/user/${user.memberName}`)
}

export default {
  userView,
  updateUser,
  changePassword
}
