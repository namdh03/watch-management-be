import { Schema, model } from 'mongoose'

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
const Comment = model('Comment', commentSchema)

export default Comment
