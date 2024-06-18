import { Request, Response } from 'express'
import { WATCH_MESSAGES } from '~/constants/messages'
import { TypedRequestBody, TypedRequestParams, TypedRequestParamsBody } from '~/models/requests'
import { UpdateWatchReqParams, WatchReqBody } from '~/models/requests/Watch.requests'
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
  res.flash('success', WATCH_MESSAGES.CREATE_WATCH_SUCCESSFULLY)
  res.redirect('/admin/watch')
}

// [GET] /admin/watch/update/:watchId
const updateWatchView = async (req: TypedRequestParams<UpdateWatchReqParams>, res: Response) => {
  const watch = await watchService.getWatchById(req.params.watchId)
  res.render('update-watch', { watch })
}

// [PUT] /admin/watch/update/:watchId
const updateWatch = async (req: TypedRequestParamsBody<UpdateWatchReqParams, WatchReqBody>, res: Response) => {
  await watchService.updateWatch(req.params.watchId, req.body)
  res.flash('success', WATCH_MESSAGES.UPDATE_WATCH_SUCCESSFULLY)
  res.redirect('/admin/watch')
}

// [DELETE] /admin/watch/delete/:watchId
const deleteWatch = async (req: TypedRequestParams<UpdateWatchReqParams>, res: Response) => {
  await watchService.deleteWatch(req.params.watchId)
  res.redirect('/admin/watch')
}

export default {
  watchesView,
  createWatchView,
  createWatch,
  updateWatchView,
  updateWatch,
  deleteWatch
}
