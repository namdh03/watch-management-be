import { Query, ParamsDictionary } from 'express-serve-static-core'
import { NextFunction, Request, RequestHandler, Response } from 'express'

export const wrapRequestHandler = <P = ParamsDictionary, ResBody = Response, ReqBody = Request, ReqQuery = Query>(
  fn: RequestHandler<P, ResBody, ReqBody, ReqQuery>
) => {
  return (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response<ResBody>, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
