import { NextFunction, Request, RequestHandler, Response } from 'express'
import { ParamsDictionary, Query } from 'express-serve-static-core'

export const wrapRequestHandler = <P = ParamsDictionary, ResBody = Response, ReqBody = Request, ReqQuery = Query>(
  fn: RequestHandler<P, ResBody, ReqBody, ReqQuery>
) => {
  return (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response<ResBody>, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
