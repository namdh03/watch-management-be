import { Request, Response } from 'express'
import userService from '~/services/user.service'

// [GET] /admin/member
const memberView = async (_req: Request, res: Response) => {
  const members = await userService.getMembers()
  res.render('member', { members })
}

export default {
  memberView
}
