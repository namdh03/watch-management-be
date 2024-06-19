import { Request, Response } from 'express'
import { TypedRequestParams } from '~/models/requests'
import { MemberReqParams } from '~/models/requests/Member.requests'
import { MemberDocument } from '~/models/schemas/Member.schema'
import userService from '~/services/user.service'

// [GET] /admin/members
const memberView = async (_req: Request, res: Response) => {
  const members = await userService.getMembers()
  res.render('members', { members })
}

// [GET] /admin/members/update/:memberName
const updateMemberView = async (req: TypedRequestParams<MemberReqParams>, res: Response) => {
  const member = await userService.getMemberByName(req.params.memberName)
  res.render('update-member', { member })
}

export default {
  memberView,
  updateMemberView
}
