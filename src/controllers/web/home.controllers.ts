import { Request, Response } from 'express'
import { Pagination } from '~/constants/enum'
import watchService from '~/services/watch.service'

// [GET] /
const homeView = async (_req: Request, res: Response) => {
  const { watches, totalPages } = await watchService.getWatches()
  res.render('home', { watches, page: Pagination.DefaultPage, limit: Pagination.DefaultLimit, totalPages })
}

export default {
  homeView
}
