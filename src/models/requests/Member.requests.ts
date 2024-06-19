import { ParamsDictionary } from 'express-serve-static-core'

export interface MemberReqParams extends ParamsDictionary {
  memberName: string
}

export interface MemberReqBody {
  memberName: string
}
