import { isValidObjectId } from 'mongoose'
import { checkSchema } from 'express-validator'

import HTTP_STATUS from '~/constants/httpStatus'
import { BRAND_MESSAGES, WATCH_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import validate from '~/utils/validate'

export const bodyWatchValidator = validate(
  checkSchema(
    {
      watchName: {
        notEmpty: {
          errorMessage: WATCH_MESSAGES.WATCH_NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: WATCH_MESSAGES.WATCH_NAME_MUST_BE_A_STRING
        },
        trim: true,
        isLength: {
          options: {
            min: 1,
            max: 100
          },
          errorMessage: WATCH_MESSAGES.WATCH_NAME_LENGTH_MUST_BE_BETWEEN_1_AND_100
        }
      },
      image: {
        isURL: {
          errorMessage: WATCH_MESSAGES.IMAGE_MUST_BE_A_URL
        },
        isString: {
          errorMessage: WATCH_MESSAGES.IMAGE_MUST_BE_A_STRING
        },
        trim: true,
        isLength: {
          options: {
            min: 1,
            max: 255
          },
          errorMessage: WATCH_MESSAGES.IMAGE_LENGTH_MUST_BE_BETWEEN_1_AND_255
        }
      },
      price: {
        isNumeric: {
          errorMessage: WATCH_MESSAGES.PRICE_MUST_BE_A_NUMBER
        },
        trim: true,
        isFloat: {
          options: {
            min: 1,
            max: 1000000000
          },
          errorMessage: WATCH_MESSAGES.PRICE_MUST_BE_MORE_THAN_1_AND_LESS_THAN_1000000000
        }
      },
      automatic: {
        optional: true,
        isBoolean: {
          errorMessage: WATCH_MESSAGES.AUTOMATIC_MUST_BE_A_BOOLEAN
        },
        trim: true
      },
      watchDescription: {
        optional: true,
        isString: {
          errorMessage: WATCH_MESSAGES.WATCH_DESCRIPTION_MUST_BE_A_STRING
        },
        trim: true,
        isLength: {
          options: {
            min: 1,
            max: 500
          },
          errorMessage: WATCH_MESSAGES.WATCH_DESCRIPTION_LENGTH_MUST_BE_BETWEEN_1_AND_500
        }
      },
      brandId: {
        notEmpty: {
          errorMessage: BRAND_MESSAGES.BRAND_ID_IS_REQUIRED
        },
        isString: {
          errorMessage: BRAND_MESSAGES.BRAND_ID_MUST_BE_A_STRING
        },
        trim: true,
        custom: {
          options: async (value) => {
            if (!isValidObjectId(value)) {
              throw new Error(BRAND_MESSAGES.BRAND_ID_MUST_BE_A_VALID_ID)
            }

            return true
          }
        }
      }
    },
    ['body']
  )
)

export const watchIdValidator = validate(
  checkSchema(
    {
      watchId: {
        custom: {
          options: async (value) => {
            if (!isValidObjectId(value)) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.BAD_REQUEST,
                message: WATCH_MESSAGES.WATCH_ID_MUST_BE_A_VALID_ID
              })
            }

            return true
          }
        }
      }
    },
    ['params']
  )
)
