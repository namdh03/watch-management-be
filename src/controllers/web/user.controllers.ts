import { Response } from 'express'
import { TypedRequestParams } from '~/models/requests'
import { MemberReqParams } from '~/models/requests/Member.requests'
import userService from '~/services/user.service'

// [GET] /:memberName
const userView = async (req: TypedRequestParams<MemberReqParams>, res: Response) => {
  const member = await userService.getMemberByName(req.params.memberName)
  res.render('user', { member })
}

export default {
  userView
}
