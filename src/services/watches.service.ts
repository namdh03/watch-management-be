import Watch from '~/models/schemas/Watch.schema'

class WatchesService {
  async getWatches() {
    return await Watch.find(
      {},
      {
        comments: 0,
        watchDescription: 0
      }
    )
  }
}

const watchesService = new WatchesService()

export default watchesService
