import HTTP_STATUS from '~/constants/httpStatus'
import { BRAND_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import { BrandReqBody } from '~/models/requests/Brand.requests'
import Brand from '~/models/schemas/Brand.schema'
import watchService from './watch.service'

class BrandService {
  async getBrandsWithWatchCount() {
    return await Brand.aggregate([
      {
        $lookup: {
          from: 'watches',
          localField: '_id',
          foreignField: 'brand',
          as: 'watches'
        }
      },
      {
        $addFields: {
          watchCount: {
            $size: '$watches'
          }
        }
      },
      {
        $project: {
          watches: 0
        }
      }
    ])
  }

  async getBrands() {
    return await Brand.find({})
  }

  async checkExistedBrandName(brandName: string) {
    const isExisted = await Brand.exists({
      brandName: {
        $regex: new RegExp(`^${brandName}$`, 'i')
      }
    })

    if (isExisted) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: BRAND_MESSAGES.BRAND_NAME_ALREADY_EXISTS
      })
    }

    return isExisted
  }

  async createBrand(body: BrandReqBody) {
    await this.checkExistedBrandName(body.brandName)
    return await Brand.create(body)
  }

  async getBrandByName(brandName: string) {
    const brand = await Brand.findOne({
      brandName: {
        $regex: new RegExp(`^${brandName}$`, 'i')
      }
    })

    if (!brand) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: BRAND_MESSAGES.BRAND_NAME_DOES_NOT_EXIST
      })
    }

    return brand
  }

  async updateBrand(brandId: string, body: BrandReqBody) {
    await this.checkExistedBrandName(body.brandName)
    return await Brand.updateOne(
      {
        _id: brandId
      },
      {
        $set: body
      }
    )
  }

  async deleteBrand(brandId: string) {
    const isBrandUsed = await watchService.checkExistedWatchByBrandId(brandId)

    if (isBrandUsed) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: BRAND_MESSAGES.CAN_NOT_DELETE_USED_BRAND
      })
    }

    const result = await Brand.deleteOne({
      _id: brandId
    })

    if (!result.deletedCount) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: BRAND_MESSAGES.BRAND_ID_DOES_NOT_EXIST
      })
    }

    return result
  }

  async getBrandById(brandId: string) {
    const brand = await Brand.findById(brandId)

    if (!brand) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: BRAND_MESSAGES.BRAND_ID_DOES_NOT_EXIST
      })
    }

    return brand
  }

  async getBrandIdByName(brandName: string) {
    return await Brand.exists({
      brandName: {
        $regex: new RegExp(`^${brandName}$`, 'i')
      }
    })
  }
}

const brandService = new BrandService()

export default brandService
