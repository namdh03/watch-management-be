import { NextFunction, Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { SERVER_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'

export const webDefaultErrorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  try {
    if (err instanceof ErrorWithStatus) {
      if (err.status === HTTP_STATUS.NOT_FOUND) {
        return res.status(err.status).render('404', {
          message: SERVER_MESSAGES.PAGE_NOT_FOUND,
          error: err
        })
      }

      res.flash('error', JSON.stringify(err))

      res.redirect(req.page || req.originalUrl)
    }
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).render('error', {
      message: SERVER_MESSAGES.INTERNAL_SERVER_ERROR,
      error
    })
  }
}
