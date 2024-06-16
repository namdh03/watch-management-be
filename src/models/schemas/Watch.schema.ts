import { Schema, model } from 'mongoose'
import { commentSchema } from './Comment.schema'

const watchSchema = new Schema(
  {
    watchName: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    automatic: {
      type: Boolean,
      default: false
    },
    watchDescription: {
      type: String,
      required: true
    },
    comments: [commentSchema],
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brands',
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Watch = model('Watch', watchSchema)

export default Watch
