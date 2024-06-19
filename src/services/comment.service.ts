import { CommentReqBody } from '~/models/requests/Comment.requests'
import watchService from './watch.service'
import { ErrorWithStatus } from '~/models/errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { WATCH_MESSAGES } from '~/constants/messages'
import Watch from '~/models/schemas/Watch.schema'

class CommentService {
  async commentOnWatch(authorId: string, body: CommentReqBody) {
    const isWatchExistByAuthorId = await watchService.checkExistedWatchByAuthorId(authorId)

    if (isWatchExistByAuthorId) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: WATCH_MESSAGES.WATCH_ALREADY_COMMENTED
      })
    }

    const watch = await Watch.findByIdAndUpdate(
      {
        _id: body.watchId
      },
      {
        $push: {
          comments: {
            ...body,
            author: authorId
          }
        }
      }
    )

    if (!watch) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: WATCH_MESSAGES.WATCH_ID_DOES_NOT_EXIST
      })
    }

    return watch
  }
}

const commentService = new CommentService()

export default commentService
