import { Request, Response } from 'express'
import watchService from '~/services/watch.service'

// [GET] /
const homeView = async (_req: Request, res: Response) => {
  const watches = await watchService.getWatches()
  res.render('home', { watches })
}

export default {
  homeView
}
