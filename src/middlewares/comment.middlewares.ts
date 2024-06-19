import { checkSchema } from 'express-validator'
import { isValidObjectId } from 'mongoose'
import HTTP_STATUS from '~/constants/httpStatus'
import { WATCH_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import validate from '~/utils/validate'

export const commentOnWatchValidator = validate(
  checkSchema({
    watchId: {
      notEmpty: {
        errorMessage: WATCH_MESSAGES.WATCH_ID_IS_REQUIRED
      },
      isString: {
        errorMessage: WATCH_MESSAGES.WATCH_ID_MUST_BE_A_STRING
      },
      trim: true,
      custom: {
        options: (value) => {
          if (!isValidObjectId(value)) {
            throw new ErrorWithStatus({
              status: HTTP_STATUS.BAD_REQUEST,
              message: WATCH_MESSAGES.WATCH_ID_MUST_BE_A_VALID_ID
            })
          }

          return true
        }
      }
    },
    rating: {
      notEmpty: {
        errorMessage: WATCH_MESSAGES.RATING_IS_REQUIRED
      },
      isInt: {
        options: {
          min: 1,
          max: 3
        },
        errorMessage: WATCH_MESSAGES.RATING_MUST_BE_A_NUMBER_BETWEEN_1_AND_3
      }
    },
    content: {
      notEmpty: {
        errorMessage: WATCH_MESSAGES.WATCH_DESCRIPTION_MUST_BE_A_STRING
      },
      isString: {
        errorMessage: WATCH_MESSAGES.WATCH_DESCRIPTION_MUST_BE_A_STRING
      },
      trim: true,
      isLength: {
        options: {
          min: 1,
          max: 500
        },
        errorMessage: WATCH_MESSAGES.WATCH_CONTENT_LENGTH_MUST_BE_BETWEEN_1_AND_500
      }
    }
  })
)
