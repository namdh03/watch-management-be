import { NextFunction, Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { SERVER_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'

export const webDefaultErrorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  try {
    console.log('webDefaultErrorHandler', req.method, req.originalUrl, err)
    if (err instanceof ErrorWithStatus) {
      if (err.status === HTTP_STATUS.UNAUTHORIZED) {
        return res.redirect('/sign-in')
      }

      if (err.status === HTTP_STATUS.NOT_FOUND) {
        return res.status(err.status).render('404', {
          message: SERVER_MESSAGES.PAGE_NOT_FOUND,
          error: err
        })
      }

      res.flash('error', JSON.stringify(err))
      res.redirect('back')
    } else {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).render('500', {
        message: SERVER_MESSAGES.INTERNAL_SERVER_ERROR,
        error: err
      })
    }
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).render('500', {
      message: SERVER_MESSAGES.INTERNAL_SERVER_ERROR,
      error
    })
  }
}
