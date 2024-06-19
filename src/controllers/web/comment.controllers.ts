import { Request, Response } from 'express'
import { MemberDocument } from '~/models/schemas/Member.schema'
import commentService from '~/services/comment.service'

// [POST] /watch
const commentOnWatch = async (req: Request, res: Response) => {
  const { id } = req.user as MemberDocument
  const watch = await commentService.commentOnWatch(id, req.body)
  res.render('watch', { watch })
}

export default {
  commentOnWatch
}
