import { Response } from 'express'
import { TypedRequestParams, TypedRequestParamsBody } from '~/models/requests'
import { MemberReqBody, MemberReqParams } from '~/models/requests/Member.requests'
import userService from '~/services/user.service'

// [GET] /:memberName
const userView = async (req: TypedRequestParams<MemberReqParams>, res: Response) => {
  const member = await userService.getMemberByName(req.params.memberName)
  res.render('user', { member })
}

// [PUT] /:memberName
const updateUser = async (req: TypedRequestParamsBody<MemberReqParams, MemberReqBody>, res: Response) => {
  await userService.updateMember(req.params.memberName, req.body)
  res.redirect(`/${req.body.memberName}`)
}

export default {
  userView,
  updateUser
}
