import { NextFunction, Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { SERVER_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import errorPageMappings from '~/utils/errorPageMappings'
import getBaseRoute from '~/utils/getBaseRoute'

export const webDefaultErrorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  try {
    console.log('webDefaultErrorHandler', err)
    if (err instanceof ErrorWithStatus) {
      if (err.status === HTTP_STATUS.NOT_FOUND) {
        return res.status(err.status).render('404', {
          message: SERVER_MESSAGES.PAGE_NOT_FOUND,
          error: err
        })
      }

      const baseRoute = getBaseRoute(req.originalUrl)
      if (baseRoute) {
        const view = errorPageMappings[baseRoute]
        if (view) return res.render(view, { error: err })
      } else {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).render('error', {
          message: SERVER_MESSAGES.INTERNAL_SERVER_ERROR,
          error: err
        })
      }
    }
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).render('error', {
      message: SERVER_MESSAGES.INTERNAL_SERVER_ERROR,
      error
    })
  }
}
