import { NextFunction, Request, Response } from 'express'
import { ParamSchema, checkSchema } from 'express-validator'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { JWT_SECRET_ACCESS_TOKEN, JWT_SECRET_REFRESH_TOKEN } from '~/constants/env'
import HTTP_STATUS from '~/constants/httpStatus'
import { USER_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import { TokenPayload } from '~/models/requests/Auth.requests'
import { MemberDocument } from '~/models/schemas/Member.schema'
import userService from '~/services/user.service'
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

const confirmPasswordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USER_MESSAGES.CONFIRM_PASSWORD_IS_REQUIRED
  },
  isString: {
    errorMessage: USER_MESSAGES.CONFIRM_PASSWORD_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 6,
      max: 50
    },
    errorMessage: USER_MESSAGES.CONFIRM_PASSWORD_LENGTH_MUST_BE_BETWEEN_6_AND_50
  },
  isStrongPassword: {
    options: {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    },
    errorMessage: USER_MESSAGES.CONFIRM_PASSWORD_MUST_BE_STRONG
  },
  custom: {
    options: (value, { req }) => value === req.body.password,
    errorMessage: USER_MESSAGES.PASSWORDS_DO_NOT_MATCH
  }
}

export const signInBodyValidator = validate(
  checkSchema(
    {
      memberName: memberNameSchema,
      password: passwordSchema
    },
    ['body']
  )
)

export const signUpBodyValidator = validate(
  checkSchema(
    {
      memberName: memberNameSchema,
      password: passwordSchema,
      confirmPassword: confirmPasswordSchema
    },
    ['body']
  )
)

export const webRefreshTokenValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.cookies
  if (!refreshToken) {
    return next(
      new ErrorWithStatus({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: USER_MESSAGES.REFRESH_TOKEN_IS_REQUIRED
      })
    )
  }

  try {
    const isExistedRefreshToken = await userService.checkExistedRefreshToken(refreshToken)
    if (!isExistedRefreshToken) {
      res.clearCookie('accessToken')
      res.clearCookie('refreshToken')
      return next(
        new ErrorWithStatus({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: USER_MESSAGES.REFRESH_TOKEN_IS_REQUIRED
        })
      )
    }

    const { userId, exp } = await verifyToken({
      token: refreshToken,
      secretOrPublicKey: JWT_SECRET_REFRESH_TOKEN
    })
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await userService.refreshToken({
      userId,
      refreshToken,
      exp
    })
    const decodeAuthorization = await verifyToken({
      token: newAccessToken,
      secretOrPublicKey: JWT_SECRET_ACCESS_TOKEN
    })

    console.log('New access token:', newAccessToken, 'New refresh token:', newRefreshToken)

    req.decodeAuthorization = decodeAuthorization
    res.cookie('accessToken', newAccessToken, { httpOnly: true })
    res.cookie('refreshToken', newRefreshToken, { httpOnly: true })
    next()
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.clearCookie('accessToken')
      res.clearCookie('refreshToken')
    }

    return next(error)
  }
}

export const webAccessTokenValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies

  if (accessToken) {
    try {
      const decodeAuthorization = await verifyToken({
        token: accessToken,
        secretOrPublicKey: JWT_SECRET_ACCESS_TOKEN
      })

      req.decodeAuthorization = decodeAuthorization
      return next()
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        if (error instanceof TokenExpiredError) {
          return webRefreshTokenValidator(req, res, next)
        }

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

  next()
}

export const memberNameValidator = validate(
  checkSchema(
    {
      memberName: {
        ...memberNameSchema,
        custom: {
          options: (value: string) => {
            // Custom validation function to disallow spaces
            if (/\s/.test(value)) {
              throw new Error(USER_MESSAGES.MEMBER_NAME_MUST_NOT_CONTAIN_SPACES)
            }
            return true
          }
        }
      }
    },
    ['params']
  )
)

export const isOwnerMemberNameValidator = (req: Request, _res: Response, next: NextFunction) => {
  const user = req.user as MemberDocument
  const memberName = req.params.memberName

  if (user.memberName !== memberName) {
    return next(
      new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: USER_MESSAGES.USER_NOT_FOUND
      })
    )
  }

  next()
}

export const updateMemberValidator = validate(
  checkSchema(
    {
      memberName: {
        ...memberNameSchema,
        custom: {
          options: async (value) => {
            // Custom validation function to disallow spaces
            if (/\s/.test(value)) {
              throw new Error(USER_MESSAGES.MEMBER_NAME_MUST_NOT_CONTAIN_SPACES)
            }

            return true
          }
        }
      },
      name: {
        notEmpty: {
          errorMessage: USER_MESSAGES.NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: USER_MESSAGES.NAME_MUST_BE_A_STRING
        },
        trim: true,
        isLength: {
          options: {
            min: 1,
            max: 50
          },
          errorMessage: USER_MESSAGES.NAME_LENGTH_MUST_BE_BETWEEN_1_AND_50
        }
      },
      yob: {
        isInt: {
          options: {
            min: 1900,
            max: new Date().getFullYear()
          },
          errorMessage: USER_MESSAGES.YEAR_OF_BIRTH_MUST_BE_AN_INTEGER_BETWEEN_1900_AND_CURRENT_YEAR
        }
      }
    },
    ['body']
  )
)

export const changePasswordValidator = validate(
  checkSchema(
    {
      oldPassword: passwordSchema,
      password: passwordSchema,
      confirmPassword: confirmPasswordSchema
    },
    ['body']
  )
)

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const decodeAuthorization = req.decodeAuthorization as TokenPayload | undefined
  const user = await userService.getUserById(decodeAuthorization?.userId)

  if (user) {
    req.user = user
    res.locals.user = user
  }

  next()
}

export const apiRefreshTokenValidator = validate(
  checkSchema(
    {
      refreshToken: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: USER_MESSAGES.REFRESH_TOKEN_IS_REQUIRED
              })
            }

            try {
              const [decodeRefreshToken, refreshToken] = await Promise.all([
                verifyToken({ token: value, secretOrPublicKey: JWT_SECRET_REFRESH_TOKEN }),
                userService.checkExistedRefreshToken(value)
              ])

              if (!refreshToken) {
                throw new ErrorWithStatus({
                  status: HTTP_STATUS.UNAUTHORIZED,
                  message: USER_MESSAGES.REFRESH_TOKEN_HAS_BEEN_USED_OR_NOT_EXIST
                })
              }

              ;(req as Request).decodeRefreshToken = decodeRefreshToken
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorWithStatus({
                  status: HTTP_STATUS.UNAUTHORIZED,
                  message: error.message
                })
              }

              throw error
            }
          }
        }
      }
    },
    ['body']
  )
)

export const apiAccessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            const accessToken = value.split(' ')[1]

            if (!accessToken) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: USER_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
              })
            }

            try {
              const decodeAuthorization = await verifyToken({
                token: accessToken,
                secretOrPublicKey: JWT_SECRET_ACCESS_TOKEN
              })

              ;(req as Request).decodeAuthorization = decodeAuthorization
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorWithStatus({
                  status: HTTP_STATUS.UNAUTHORIZED,
                  message: error.message
                })
              }
            }

            return true
          }
        }
      }
    },
    ['headers']
  )
)
