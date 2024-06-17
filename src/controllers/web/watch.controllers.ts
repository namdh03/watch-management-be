import { Request, Response } from 'express'
import { TypedRequestBody } from '~/models/requests'
import { WatchReqBody } from '~/models/requests/Watch.requests'
import brandService from '~/services/brand.service'
import watchService from '~/services/watch.service'

// [GET] /admin/watch
const watchesView = async (_req: Request, res: Response) => {
  const watches = await watchService.getWatches()
  res.render('watch', { watches })
}

// [GET] /admin/watch/create
const createWatchView = async (_req: Request, res: Response) => {
  const brands = await brandService.getBrands()
  res.render('create-watch', { brands })
}

// [POST] /admin/watch/create
const createWatch = async (req: TypedRequestBody<WatchReqBody>, res: Response) => {
  await watchService.createWatch(req.body)
  res.redirect('/admin/watch')
}

// [GET] /admin/watch/update/:watchId
const updateWatchView = async (req: Request, res: Response) => {
  res.render('update-watch')
}

export default {
  watchesView,
  createWatchView,
  createWatch,
  updateWatchView
}
