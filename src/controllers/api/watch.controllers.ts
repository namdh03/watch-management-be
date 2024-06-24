import { Request, Response } from 'express'
import { WATCH_MESSAGES } from '~/constants/messages'
import { TypedRequestBody } from '~/models/requests'
import { WatchReqBody } from '~/models/requests/Watch.requests'
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
