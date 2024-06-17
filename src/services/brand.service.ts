import { BrandReqBody } from '~/models/requests/Brand.requests'
import Brand from '~/models/schemas/Brand.schema'

class BrandService {
  async getBrands() {
    return await Brand.find({})
  }

  async checkExistedBrandName({ brandName }: Pick<BrandReqBody, 'brandName'>) {
    return await Brand.exists({
      brandName: {
        $regex: brandName,
        $options: 'i'
      }
    })
  }

  async createBrand(body: BrandReqBody) {
    return await Brand.create(body)
  }

  async getBrandByName({ brandName }: Pick<BrandReqBody, 'brandName'>) {
    return await Brand.findOne({
      brandName: {
        $regex: brandName,
        $options: 'i'
      }
    })
  }
}

const brandService = new BrandService()

export default brandService
