import { Request, Response } from 'express'
import { Pagination } from '~/constants/enum'
import { WATCH_MESSAGES } from '~/constants/messages'
import { TypedRequestBody, TypedRequestParams, TypedRequestParamsBody } from '~/models/requests'
import { UpdateWatchReqParams, WatchReqBody } from '~/models/requests/Watch.requests'
import brandService from '~/services/brand.service'
import watchService from '~/services/watch.service'

// [GET] /admin/watches
const watchesView = async (_req: Request, res: Response) => {
  const watches = await watchService.getAllWatches()
  const brands = await brandService.getBrandsWithWatchCount()
  res.render('watches', {
    title: 'Node.js | Watches',
    layout: 'admin',
    watches,
    brands,
    page: Pagination.DefaultPage,
    limit: Pagination.DefaultLimit
  })
}

// [GET] /admin/watches/create
const createWatchView = async (_req: Request, res: Response) => {
  const brands = await brandService.getBrands()
  res.render('create-watch', { brands })
}

// [POST] /admin/watches/create
const createWatch = async (req: TypedRequestBody<WatchReqBody>, res: Response) => {
  await watchService.createWatch(req.body)
  res.flash('success', WATCH_MESSAGES.CREATE_WATCH_SUCCESSFULLY)
  res.redirect('/admin/watches')
}

// [GET] /admin/watches/update/:watchId
const updateWatchView = async (req: TypedRequestParams<UpdateWatchReqParams>, res: Response) => {
  const watch = await watchService.getWatchById(req.params.watchId)
  res.render('update-watch', { watch })
}

// [PUT] /admin/watches/update/:watchId
const updateWatch = async (req: TypedRequestParamsBody<UpdateWatchReqParams, WatchReqBody>, res: Response) => {
  await watchService.updateWatch(req.params.watchId, req.body)
  res.flash('success', WATCH_MESSAGES.UPDATE_WATCH_SUCCESSFULLY)
  res.redirect('/admin/watches')
}

// [DELETE] /admin/watches/delete/:watchId
const deleteWatch = async (req: TypedRequestParams<UpdateWatchReqParams>, res: Response) => {
  await watchService.deleteWatch(req.params.watchId)
  res.flash('success', WATCH_MESSAGES.DELETE_WATCH_SUCCESSFULLY)
  res.redirect('/admin/watches')
}

export default {
  watchesView,
  createWatchView,
  createWatch,
  updateWatchView,
  updateWatch,
  deleteWatch
}
