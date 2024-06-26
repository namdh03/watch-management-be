import HTTP_STATUS from '~/constants/httpStatus'
import { COMMENT_MESSAGES, WATCH_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import { CommentWatchReqBody } from '~/models/requests/Comment.requests'

import watchService from './watch.service'

class CommentService {
  async commentOnWatch(authorId: string, body: CommentWatchReqBody) {
    const isWatchExistByAuthorId = await watchService.checkExistedWatchByAuthorId(body.watchId, authorId)

    if (isWatchExistByAuthorId) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: WATCH_MESSAGES.WATCH_ALREADY_COMMENTED
      })
    }

    const watch = await watchService.findByIdAndAddComment(body.watchId, authorId, body)

    if (!watch) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: WATCH_MESSAGES.WATCH_ID_DOES_NOT_EXIST
      })
    }

    return watch
  }

  async deleteCommentOnWatch(authorId: string, commentId: string) {
    const isCommentExistByAuthorId = await watchService.checkExistedCommentByAuthorId(commentId, authorId)

    if (!isCommentExistByAuthorId) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: COMMENT_MESSAGES.COMMENT_DOES_NOT_EXIST
      })
    }

    const watch = await watchService.findByIdAndDeleteComment(commentId, authorId)

    return watch
  }
}

const commentService = new CommentService()

export default commentService
