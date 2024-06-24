import { NextFunction, Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { SERVER_MESSAGES, USER_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import { TokenPayload } from '~/models/requests/Auth.requests'
import { MemberDocument } from '~/models/schemas/Member.schema'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies
  const user = req.user as MemberDocument

  if (!accessToken) {
    return next(
      new ErrorWithStatus({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: USER_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
      })
    )
  }

  if (!user) {
    return next(
      new ErrorWithStatus({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: SERVER_MESSAGES.UNAUTHORIZED
      })
    )
  }

  next()
}

export const webIsAdminMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const user = req.user as MemberDocument
  const isAdmin = user.isAdmin

  if (!isAdmin) {
    return next(
      new ErrorWithStatus({
        status: HTTP_STATUS.FORBIDDEN,
        message: SERVER_MESSAGES.FORBIDDEN
      })
    )
  }

  next()
}

export const apiIsAdminMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const { isAdmin } = req.decodeAuthorization as TokenPayload

  if (!isAdmin) {
    return next(
      new ErrorWithStatus({
        status: HTTP_STATUS.FORBIDDEN,
        message: SERVER_MESSAGES.FORBIDDEN
      })
    )
  }

  next()
}
