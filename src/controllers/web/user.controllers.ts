import { Response } from 'express'
import { TypedRequestBody, TypedRequestParams } from '~/models/requests'
import { MemberReqBody, MemberReqParams } from '~/models/requests/Member.requests'
import { MemberDocument } from '~/models/schemas/Member.schema'
import userService from '~/services/user.service'

// [GET] /:memberName
const userView = async (req: TypedRequestParams<MemberReqParams>, res: Response) => {
  const member = await userService.getMemberByName(req.params.memberName)
  res.render('user', { member })
}

// [PUT] /
const updateUser = async (req: TypedRequestBody<MemberReqBody>, res: Response) => {
  const user = req.user as MemberDocument
  await userService.updateMember(user.id, req.body)
  res.redirect(`/user/${req.body.memberName}`)
}

export default {
  userView,
  updateUser
}
