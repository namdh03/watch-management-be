import { Response } from 'express'

import HTTP_STATUS from '~/constants/httpStatus'
import { COMMENT_MESSAGES } from '~/constants/messages'
import { TypedRequestBody, TypedRequestParams } from '~/models/requests'
import { TokenPayload } from '~/models/requests/Auth.requests'
import { CommentWatchReqBody, CommentWatchReqParams } from '~/models/requests/Comment.requests'
import commentService from '~/services/comment.service'

// [POST] /comments/watch
export const commentWatchController = async (req: TypedRequestBody<CommentWatchReqBody>, res: Response) => {
  const { userId } = req.decodeAuthorization as TokenPayload
  const watch = await commentService.commentOnWatch(userId, req.body)
  res.status(HTTP_STATUS.CREATED).json({
    message: COMMENT_MESSAGES.COMMENT_SUCCESSFULLY,
    data: watch
  })
}

// [DELETE] /comments/watch/:commentId
export const deleteCommentWatchController = async (req: TypedRequestParams<CommentWatchReqParams>, res: Response) => {
  const { userId } = req.decodeAuthorization as TokenPayload
  await commentService.deleteCommentOnWatch(userId, req.params.commentId)
  res.json({
    message: COMMENT_MESSAGES.DELETE_COMMENT_SUCCESSFULLY
  })
}
