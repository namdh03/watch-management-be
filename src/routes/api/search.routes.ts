import { Router } from 'express'
import { searchWatchController } from '~/controllers/api/search.controllers'
import { paginationValidator, searchWatchValidator } from '~/middlewares/search.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const searchRouter = Router()

/**
 * Description. Search watch
 * Path: /search/watches
 * Method: GET
 * Query: {
 *  name: string,
 *  brand: string,
 *  page: number,
 *  limit: number
 * }
 */
searchRouter.get('/watches', paginationValidator, searchWatchValidator, wrapRequestHandler(searchWatchController))

export default searchRouter
