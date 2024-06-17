import { NextFunction, Request, Response } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'
import { JWT_SECRET_ACCESS_TOKEN } from '~/constants/env'
import HTTP_STATUS from '~/constants/httpStatus'
import { USER_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import { verifyToken } from '~/utils/jwt'

export const verifyAccessToken = async (req: Request, _res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies

  if (!accessToken) {
    return next(
      new ErrorWithStatus({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: USER_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
      })
    )
  }

  try {
    const decode_authorization = await verifyToken({
      token: accessToken,
      secretOrPublicKey: JWT_SECRET_ACCESS_TOKEN
    })

    ;(req as Request).decode_authorization = decode_authorization
    next()
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return next(
        new ErrorWithStatus({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: error.message
        })
      )
    }
    return next(error)
  }
}
