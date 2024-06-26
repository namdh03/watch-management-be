import { Response } from 'express'

import { Pagination } from '~/constants/enum'
import { TypedRequestQuery } from '~/models/requests'
import { SearchWatchQuery } from '~/models/requests/Search.requests'
import brandService from '~/services/brand.service'
import watchService from '~/services/watch.service'

// [GET] /search?name=string&brand=string&page=string&limit=string
const searchWatch = async (req: TypedRequestQuery<SearchWatchQuery>, res: Response) => {
  const { name, brand, page, limit } = req.query
  const { watches, totalPages } = await watchService.searchWatch({ name, brand, page, limit })
  const brands = await brandService.getBrands()
  const nameQuery = req.query.name
  const brandQuery = req.query.brand
  const pageQuery = req.query.page
  const limitQuery = req.query.limit

  res.render('home', {
    title: 'Node.js | Home',
    watches,
    brands,
    page: Number(pageQuery || Pagination.DefaultPage),
    limit: limitQuery || Pagination.DefaultLimit,
    totalPages,
    name: nameQuery,
    brand: brandQuery
  })
}

export default {
  searchWatch
}
