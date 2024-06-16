import { Schema, model } from 'mongoose'

const memberSchema = new Schema(
  {
    memberName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)
const Member = model('Member', memberSchema)

export default Member
