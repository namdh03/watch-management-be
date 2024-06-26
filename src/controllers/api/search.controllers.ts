import { Response } from 'express'

import { Pagination } from '~/constants/enum'
import { WATCH_MESSAGES } from '~/constants/messages'
import { TypedRequestQuery } from '~/models/requests'
import { SearchWatchQuery } from '~/models/requests/Search.requests'
import watchService from '~/services/watch.service'

// [GET] /search/watches
export const searchWatchController = async (req: TypedRequestQuery<SearchWatchQuery>, res: Response) => {
  const { name, brand, page, limit } = req.query
  const { watches, totalItems, totalPages } = await watchService.searchWatch({ name, brand, page, limit })
  return res.json({
    message: WATCH_MESSAGES.GET_WATCHES_SUCCESSFULLY,
    data: {
      watches,
      page: Number(page || Pagination.DefaultPage),
      limit: limit || Pagination.DefaultLimit,
      totalItems,
      totalPages
    }
  })
}
