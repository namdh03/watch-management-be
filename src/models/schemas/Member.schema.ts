import { Document, model, Schema } from 'mongoose'

export interface MemberDocument extends Document {
  memberName: string
  password: string
  isAdmin: boolean
  name?: string
  yob?: number
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
    },
    name: {
      type: String
    },
    yob: {
      type: Number
    }
  },
  {
    timestamps: true
  }
)
const Member = model<MemberDocument>('Member', memberSchema)

export default Member
