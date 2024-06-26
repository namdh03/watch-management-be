import { Request, Response } from 'express'

import { Pagination } from '~/constants/enum'
import brandService from '~/services/brand.service'
import watchService from '~/services/watch.service'

// [GET] /
const homeView = async (_req: Request, res: Response) => {
  const { watches, totalPages } = await watchService.getWatches()
  const brands = await brandService.getBrands()
  res.render('home', {
    title: 'Node.js | Home',
    watches,
    brands,
    page: Pagination.DefaultPage,
    limit: Pagination.DefaultLimit,
    totalPages
  })
}

export default {
  homeView
}
