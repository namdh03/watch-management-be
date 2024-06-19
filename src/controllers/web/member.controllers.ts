import { Request, Response } from 'express'
import userService from '~/services/user.service'

// [GET] /admin/members
const memberView = async (_req: Request, res: Response) => {
  const members = await userService.getMembers()
  res.render('members', { members })
}

export default {
  memberView
}
