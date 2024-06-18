import { Schema, model } from 'mongoose'

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
      expires: 0
    }
  }
})

const RefreshToken = model('RefreshToken', refreshTokenSchema)

export default RefreshToken
