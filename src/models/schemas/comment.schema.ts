import { Schema, model } from 'mongoose'

export const commentSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 3,
      require: true
    },
    content: {
      type: String,
      require: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Members',
      require: true
    }
  },
  {
    timestamps: true
  }
)
const Comment = model('Comment', commentSchema)

export default Comment
