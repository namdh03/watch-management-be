import { Request, Response } from 'express'
import watchesService from '~/services/watches.service'

// [GET] /admin/watch
const watchesView = async (_req: Request, res: Response) => {
  const watches = await watchesService.getWatches()
  res.render('watch', { watches })
}

// [GET] /admin/watch/create
const createWatchView = async (_req: Request, res: Response) => {
  res.render('create-watch')
}

// [POST] /admin/watch/create
const createWatch = async (req: Request, res: Response) => {
  console.log(req.body)

  res.send('Watch created')
}

export default {
  watchesView,
  createWatchView,
  createWatch
}
