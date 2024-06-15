import { Schema, model } from 'mongoose'

const memberSchema = new Schema(
  {
    memberName: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
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
