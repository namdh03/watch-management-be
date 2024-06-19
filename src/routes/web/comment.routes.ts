import { Router } from 'express'
import commentControllers from '~/controllers/web/comment.controllers'
import { commentOnWatchValidator } from '~/middlewares/comment.middlewares'
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
commentRouter.post('/watch', commentOnWatchValidator, wrapRequestHandler(commentControllers.commentOnWatch))

/**
 * Description. Delete a comment on a watch
 * Path: /watch/:commentId
 * Method: DELETE
 */
commentRouter.delete('/watch/:commentId', wrapRequestHandler(commentControllers.deleteCommentOnWatch))

export default commentRouter
