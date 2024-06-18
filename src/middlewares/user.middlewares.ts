import { NextFunction, Request, Response } from 'express'
import { ParamSchema, checkSchema } from 'express-validator'
import { JsonWebTokenError } from 'jsonwebtoken'
import { JWT_SECRET_ACCESS_TOKEN } from '~/constants/env'
import HTTP_STATUS from '~/constants/httpStatus'
import { USER_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import { verifyToken } from '~/utils/jwt'
import validate from '~/utils/validate'

const memberNameSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USER_MESSAGES.MEMBER_NAME_IS_REQUIRED
  },
  isString: {
    errorMessage: USER_MESSAGES.MEMBER_NAME_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 20
    },
    errorMessage: USER_MESSAGES.MEMBER_NAME_LENGTH_MUST_BE_BETWEEN_1_AND_20
  }
}

const passwordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USER_MESSAGES.PASSWORD_IS_REQUIRED
  },
  isString: {
    errorMessage: USER_MESSAGES.PASSWORD_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 6,
      max: 50
    },
    errorMessage: USER_MESSAGES.PASSWORD_LENGTH_MUST_BE_BETWEEN_6_AND_50
  },
  isStrongPassword: {
    options: {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    },
    errorMessage: USER_MESSAGES.PASSWORD_MUST_BE_STRONG
  }
}

export const authBodyValidator = validate(
  checkSchema({
    memberName: memberNameSchema,
    password: passwordSchema
  })
)

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
    const decodeAuthorization = await verifyToken({
      token: accessToken,
      secretOrPublicKey: JWT_SECRET_ACCESS_TOKEN
    })

    req.decodeAuthorization = decodeAuthorization
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
