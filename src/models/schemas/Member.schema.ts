import { Document, Schema, model } from 'mongoose'

export interface MemberDocument extends Document {
  memberName: string
  password: string
  isAdmin: boolean
}

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
const Member = model<MemberDocument>('Member', memberSchema)

export default Member
