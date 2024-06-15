import { Schema, model } from 'mongoose'

export const brandSchema = new Schema(
  {
    brandName: String
  },
  {
    timestamps: true
  }
)
const Brand = model('Brand', brandSchema)

export default Brand
