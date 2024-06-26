import { ParamsDictionary } from 'express-serve-static-core'

export interface MemberReqParams extends ParamsDictionary {
  memberName: string
}

export interface MemberReqBody {
  memberName: string
  name: string
  yob: number
}

export interface ChangePasswordReqBody {
  oldPassword: string
  password: string
  confirmPassword: string
}

export interface RefreshTokenReqBody {
  refreshToken: string
}
