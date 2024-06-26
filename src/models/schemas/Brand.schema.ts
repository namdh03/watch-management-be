import { Document, model, Schema } from 'mongoose'

export interface BrandDocument extends Document {
  brandName: string
}

export const brandSchema = new Schema(
  {
    brandName: String
  },
  {
    timestamps: true
  }
)
const Brand = model<BrandDocument>('Brand', brandSchema)

export default Brand
