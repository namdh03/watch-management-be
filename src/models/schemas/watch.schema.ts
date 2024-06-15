import { Schema, model } from 'mongoose'
import { commentSchema } from './comment.schema'

const watchSchema = new Schema(
  {
    watchName: {
      type: String,
      require: true
    },
    image: {
      type: String,
      require: true
    },
    price: {
      type: Number,
      require: true
    },
    automatic: {
      type: Boolean,
      default: false
    },
    watchDescription: {
      type: String,
      require: true
    },
    comments: [commentSchema],
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brands',
      require: true
    }
  },
  {
    timestamps: true
  }
)
const Watch = model('Watch', watchSchema)

export default Watch
