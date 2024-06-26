import { Document, Schema } from 'mongoose'

export interface CommentDocument extends Document {
  rating: number
  content: string
  author: Schema.Types.ObjectId
}

export const commentSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 3,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Members',
      required: true
    }
  },
  {
    timestamps: true
  }
)
