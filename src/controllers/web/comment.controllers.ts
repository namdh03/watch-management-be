import { Request, Response } from 'express'
import { MemberDocument } from '~/models/schemas/Member.schema'
import commentService from '~/services/comment.service'

// [POST] /comment/watch
const commentOnWatch = async (req: Request, res: Response) => {
  const { id } = req.user as MemberDocument
  const watch = await commentService.commentOnWatch(id, req.body)
  res.render('watch-detail', { watch })
}

// [DELETE] /comment/watch/:commentId
const deleteCommentOnWatch = async (req: Request, res: Response) => {
  const { id } = req.user as MemberDocument
  const watch = await commentService.deleteCommentOnWatch(id, req.params.commentId)
  res.render('watch-detail', { watch })
}

export default {
  commentOnWatch,
  deleteCommentOnWatch
}
