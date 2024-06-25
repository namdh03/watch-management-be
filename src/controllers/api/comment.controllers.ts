import { Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { COMMENT_MESSAGES } from '~/constants/messages'
import { TypedRequestBody } from '~/models/requests'
import { TokenPayload } from '~/models/requests/Auth.requests'
import { CommentWatchReqBody } from '~/models/requests/Comment.requests'
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
