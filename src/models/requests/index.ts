import { Request } from 'express'
import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface TypedRequestBody<T> extends Request {
  body: T
}

export interface TypedRequestQuery<T extends Query> extends Request {
  query: T
}

export interface TypedRequestQueryBody<T extends Query, U> extends Request {
  body: U
  query: T
}

export interface TypedRequestParams<T extends ParamsDictionary> extends Request {
  params: T
}

export interface TypedRequestParamsBody<T extends ParamsDictionary, U> extends Request {
  body: U
  params: T
}

export type PaginationQuery = {
  page?: string
  limit?: string
}
