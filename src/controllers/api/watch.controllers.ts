import { Request, Response } from 'express'
import { WATCH_MESSAGES } from '~/constants/messages'
import { TypedRequestBody, TypedRequestParams, TypedRequestParamsBody } from '~/models/requests'
import { WatchReqBody, WatchReqParams } from '~/models/requests/Watch.requests'
import watchService from '~/services/watch.service'

// [GET] /watches
export const getWatchesController = async (_req: Request, res: Response) => {
  const watches = await watchService.getAllWatches()
  res.json({
    message: WATCH_MESSAGES.GET_WATCHES_SUCCESSFULLY,
    data: watches
  })
}

// [POST] /watches
export const createWatchController = async (req: TypedRequestBody<WatchReqBody>, res: Response) => {
  const watch = await watchService.createWatch(req.body)
  res.json({
    message: WATCH_MESSAGES.CREATE_WATCH_SUCCESSFULLY,
    data: watch
  })
}

// [GET] /watches/:watchId
export const getWatchController = async (req: TypedRequestParams<WatchReqParams>, res: Response) => {
  const watch = await watchService.getWatchById(req.params.watchId)
  res.json({
    message: WATCH_MESSAGES.GET_WATCH_SUCCESSFULLY,
    data: watch
  })
}

// [PUT] /watches/:watchId
export const updateWatchController = async (
  req: TypedRequestParamsBody<WatchReqParams, WatchReqBody>,
  res: Response
) => {
  const watch = await watchService.updateWatch(req.params.watchId, req.body)
  res.json({
    message: WATCH_MESSAGES.UPDATE_WATCH_SUCCESSFULLY,
    data: watch
  })
}
