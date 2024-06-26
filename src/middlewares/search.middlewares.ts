import { checkSchema } from 'express-validator'

import { BRAND_MESSAGES, SERVER_MESSAGES, WATCH_MESSAGES } from '~/constants/messages'
import validate from '~/utils/validate'

export const paginationValidator = validate(
  checkSchema(
    {
      limit: {
        optional: true,
        isString: true,
        custom: {
          options: (value) => {
            const limit = Number(value)

            if (limit < 1 || limit > 100) {
              throw new Error(SERVER_MESSAGES.LIMIT_MUST_BE_A_NUMBER_BETWEEN_1_AND_100)
            }

            return true
          }
        }
      },
      page: {
        optional: true,
        isString: true,
        custom: {
          options: (value) => {
            const page = Number(value)

            if (page < 1) {
              throw new Error(SERVER_MESSAGES.PAGE_MUST_BE_A_NUMBER_GREATER_THAN_0)
            }

            return true
          }
        }
      }
    },
    ['query']
  )
)

export const searchWatchValidator = validate(
  checkSchema(
    {
      name: {
        optional: true,
        isString: {
          errorMessage: WATCH_MESSAGES.WATCH_NAME_MUST_BE_A_STRING
        },
        trim: true
      },
      brand: {
        optional: true,
        isString: {
          errorMessage: BRAND_MESSAGES.BRAND_NAME_MUST_BE_A_STRING
        },
        trim: true
      }
    },
    ['params']
  )
)
