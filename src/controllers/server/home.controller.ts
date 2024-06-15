import { Request, Response } from 'express'
import watchesService from '~/services/watches.service'

const getHomeController = async (_req: Request, res: Response) => {
  const watches = await watchesService.getWatches()
  res.render('pages/home', { watches })
}

export default getHomeController
