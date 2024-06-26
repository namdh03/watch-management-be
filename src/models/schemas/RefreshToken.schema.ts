import { Document, model, Schema } from 'mongoose'

export interface RefreshTokenDocument extends Document {
  token: string
  createdAt: Date
  userId: Schema.Types.ObjectId
  iat: Date
  exp: Date
}

const refreshTokenSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  iat: {
    type: Date,
    required: true
  },
  exp: {
    type: Date,
    required: true,
    index: {
      expireAfterSeconds: 0
    }
  }
})

const RefreshToken = model<RefreshTokenDocument>('RefreshToken', refreshTokenSchema)

export default RefreshToken
