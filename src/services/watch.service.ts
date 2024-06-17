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

  async getWatchById(watchId: string) {
    return await Watch.findById(watchId).populate('brand', 'brandName')
  }

  async updateWatch(watchId: string, body: WatchReqBody) {
    return await Watch.updateOne(
      {
        _id: watchId
      },
      {
        ...body,
        brand: body.brandId
      }
    )
  }

  async deleteWatch(watchId: string) {
    return await Watch.deleteOne({
      _id: watchId
    })
  }
}

const watchService = new WatchService()

export default watchService
