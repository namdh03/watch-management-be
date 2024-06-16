import { NextFunction, Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { SERVER_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import errorPageMappings from '~/utils/errorPageMappings'

export const webDefaultErrorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  try {
    if (err instanceof ErrorWithStatus) {
      const view = errorPageMappings[req.originalUrl]
      if (view) return res.render(view, { data: err })
    }
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).render('error', {
      message: SERVER_MESSAGES.INTERNAL_SERVER_ERROR,
      errorInfo: error
    })
  }
}
