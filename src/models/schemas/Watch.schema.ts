import { Document, model, Schema } from 'mongoose'

import { commentSchema } from './Comment.schema'

export interface WatchDocument extends Document {
  watchName: string
  image: string
  price: number
  automatic: boolean
  watchDescription: string
  comments: Schema.Types.ObjectId[]
  brand: Schema.Types.ObjectId
}

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
      ref: 'Brand',
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Watch = model<WatchDocument>('Watch', watchSchema)

export default Watch
