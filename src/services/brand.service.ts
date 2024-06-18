import HTTP_STATUS from '~/constants/httpStatus'
import { BRAND_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import { BrandReqBody } from '~/models/requests/Brand.requests'
import Brand from '~/models/schemas/Brand.schema'

class BrandService {
  async getBrands() {
    return await Brand.find({})
  }

  async checkExistedBrandName({ brandName }: Pick<BrandReqBody, 'brandName'>) {
    return await Brand.exists({
      brandName: {
        $regex: new RegExp(`^${brandName}$`, 'i')
      }
    })
  }

  async createBrand(body: BrandReqBody) {
    const isExisted = await brandService.checkExistedBrandName({ brandName: body.brandName })

    if (isExisted) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: BRAND_MESSAGES.BRAND_NAME_ALREADY_EXISTS
      })
    }

    return await Brand.create(body)
  }

  async getBrandByName({ brandName }: Pick<BrandReqBody, 'brandName'>) {
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
    return await Brand.updateOne(
      {
        _id: brandId
      },
      {
        ...body
      }
    )
  }

  async deleteBrand(brandId: string) {
    return await Brand.deleteOne({
      _id: brandId
    })
  }

  async getBrandById(brandId: string) {
    return await Brand.findById(brandId)
  }
}

const brandService = new BrandService()

export default brandService
