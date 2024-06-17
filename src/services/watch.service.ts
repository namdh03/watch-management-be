import { WatchReqBody } from '~/models/requests/Watch.requests'
import Watch from '~/models/schemas/Watch.schema'

class WatchService {
  async getWatches() {
    return await Watch.find(
      {},
      {
        comments: 0,
        watchDescription: 0
      }
    )
  }

  async createWatch(body: WatchReqBody) {
    return await Watch.create({
      ...body,
      brand: body.brandId
    })
  }
}

const watchService = new WatchService()

export default watchService
