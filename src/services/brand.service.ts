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
    return await Brand.create(body)
  }

  async getBrandByName({ brandName }: Pick<BrandReqBody, 'brandName'>) {
    return await Brand.findOne({
      brandName: {
        $regex: new RegExp(`^${brandName}$`, 'i')
      }
    })
  }

  async updateBrand(id: string, body: BrandReqBody) {
    return await Brand.findByIdAndUpdate(
      {
        _id: id
      },
      {
        ...body
      }
    )
  }
}

const brandService = new BrandService()

export default brandService
