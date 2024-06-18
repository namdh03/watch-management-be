import { NextFunction, Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { SERVER_MESSAGES, USER_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import { TokenPayload } from '~/models/requests/Auth.requests'
import { MemberDocument } from '~/models/schemas/Member.schema'
import userService from '~/services/user.service'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.decodeAuthorization as TokenPayload
  if (!userId) {
    return next(
      new ErrorWithStatus({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: SERVER_MESSAGES.UNAUTHORIZED
      })
    )
  }

  const user = await userService.getUserById(userId)
  if (!user) {
    return next(
      new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: USER_MESSAGES.USER_NOT_FOUND
      })
    )
  }

  req.user = user
  res.locals.user = user
  next()
}

export const isAdminMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const user = req.user as MemberDocument
  if (!user) {
    return next(
      new ErrorWithStatus({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: SERVER_MESSAGES.UNAUTHORIZED
      })
    )
  }

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
