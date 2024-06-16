import { Request, Response } from 'express'
import watchesService from '~/services/watches.service'

// [GET] /
const homeView = async (_req: Request, res: Response) => {
  const watches = await watchesService.getWatches()
  res.render('home', { watches })
}

export default {
  homeView
}
