import { Request, Response } from 'express'
import { TypedRequestQuery } from '~/models/requests'
import { SearchWatchQuery } from '~/models/requests/Search.requests'
import watchService from '~/services/watch.service'

// [GET] /search?name=string&brand=string&page=string&limit=string
const searchWatch = async (req: TypedRequestQuery<SearchWatchQuery>, res: Response) => {
  const { name, brand, page, limit } = req.query
  const { watches, totalPages } = await watchService.searchWatch({ name, brand, page, limit })
  res.render('home', { watches, page, limit, totalPages })
}

export default {
  searchWatch
}
