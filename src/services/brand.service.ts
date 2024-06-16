import { BrandReqBody } from '~/models/requests/Brand.requests'
import Brand from '~/models/schemas/Brand.schema'

class BrandService {
  async getBrands() {
    return await Brand.find({})
  }

  async checkExistedBrandName({ brandName }: Pick<BrandReqBody, 'brandName'>) {
    return await Brand.exists({ brandName })
  }

  async createBrand(body: BrandReqBody) {
    return await Brand.create(body)
  }
}

const brandService = new BrandService()

export default brandService
