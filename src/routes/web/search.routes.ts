import { Router } from 'express'

import searchControllers from '~/controllers/web/search.controllers'
import { paginationValidator, searchWatchValidator } from '~/middlewares/search.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const searchRouter = Router()

/**
 * Description. Search watch
 * Path: /search
 * Method: GET
 * Query: {
 *  name: string,
 *  brand: string,
 *  page: number,
 *  limit: number
 * }
 */
searchRouter.get('/', paginationValidator, searchWatchValidator, wrapRequestHandler(searchControllers.searchWatch))

export default searchRouter
