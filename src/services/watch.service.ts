import { WatchReqBody } from '~/models/requests/Watch.requests'
import Watch from '~/models/schemas/Watch.schema'
import brandService from './brand.service'
import { BRAND_MESSAGES, WATCH_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { isValidObjectId } from 'mongoose'

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
    const brand = await brandService.getBrandById(body.brandId)

    return await Watch.create({
      ...body,
      brand: brand.id
    })
  }

  async getWatchById(watchId: string) {
    // Handle for server side rendering
    if (!isValidObjectId(watchId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: WATCH_MESSAGES.WATCH_ID_MUST_BE_A_VALID_ID
      })
    }

    const watch = await Watch.findById(watchId).populate('brand', 'brandName')

    if (!watch) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: WATCH_MESSAGES.WATCH_ID_DOES_NOT_EXIST
      })
    }

    return watch
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
