import { Request, Response } from 'express'
import { COMMENT_MESSAGES } from '~/constants/messages'
import { MemberDocument } from '~/models/schemas/Member.schema'
import commentService from '~/services/comment.service'

// [POST] /comment/watch
const commentOnWatch = async (req: Request, res: Response) => {
  const { id } = req.user as MemberDocument
  const watch = await commentService.commentOnWatch(id, req.body)
  res.flash('success', COMMENT_MESSAGES.COMMENT_SUCCESSFULLY)
  res.redirect(`/watch/${watch.id}`)
}

// [DELETE] /comment/watch/:commentId
const deleteCommentOnWatch = async (req: Request, res: Response) => {
  const { id } = req.user as MemberDocument
  const watch = await commentService.deleteCommentOnWatch(id, req.params.commentId)
  res.flash('success', COMMENT_MESSAGES.DELETE_COMMENT_SUCCESSFULLY)
  res.redirect(`/watch/${watch?.id}`)
}

export default {
  commentOnWatch,
  deleteCommentOnWatch
}
