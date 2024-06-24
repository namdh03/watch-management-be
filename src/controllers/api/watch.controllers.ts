import { Request, Response } from 'express'
import { WATCH_MESSAGES } from '~/constants/messages'
import watchService from '~/services/watch.service'

// [GET] /watches
export const getWatchesController = async (_req: Request, res: Response) => {
  const watches = await watchService.getAllWatches()
  res.json({
    message: WATCH_MESSAGES.GET_WATCHES_SUCCESSFULLY,
    data: watches
  })
}
