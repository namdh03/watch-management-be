import { Request, Response } from 'express'

import watchService from '~/services/watch.service'

// [GET] /watch/:watchId
const watchDetailView = async (req: Request, res: Response) => {
  const watch = await watchService.getWatchById(req.params.watchId)
  res.render('watch-detail', { title: `Node.js | ${watch.watchName}`, watch })
}

export default {
  watchDetailView
}
