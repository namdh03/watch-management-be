import { Router } from 'express'

import { commentWatchController, deleteCommentWatchController } from '~/controllers/api/comment.controllers'
import { commentOnWatchValidator, deleteCommentWatchValidator } from '~/middlewares/comment.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const commentRouter = Router()

/**
 * Description. Comment on a watch
 * Path: /watch
 * Method: POST
 * Body: {
 *  watchId: string
 *  rating: number
 *  content: string
 * }
 */
commentRouter.post('/watch', commentOnWatchValidator, wrapRequestHandler(commentWatchController))

/**
 * Description. Delete a comment on a watch
 * Path: /watch/:commentId
 * Method: DELETE
 */
commentRouter.delete('/watch/:commentId', deleteCommentWatchValidator, wrapRequestHandler(deleteCommentWatchController))

export default commentRouter
