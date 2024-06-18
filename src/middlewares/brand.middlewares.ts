import { ParamSchema, checkSchema } from 'express-validator'
import { isValidObjectId } from 'mongoose'
import HTTP_STATUS from '~/constants/httpStatus'
import { BRAND_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import validate from '~/utils/validate'

const brandNameSchema: ParamSchema = {
  notEmpty: {
    errorMessage: BRAND_MESSAGES.BRAND_NAME_IS_REQUIRED
  },
  isString: {
    errorMessage: BRAND_MESSAGES.BRAND_NAME_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 50
    },
    errorMessage: BRAND_MESSAGES.BRAND_NAME_LENGTH_MUST_BE_BETWEEN_1_AND_50
  }
}

export const bodyBrandValidator = validate(
  checkSchema(
    {
      brandName: brandNameSchema
    },
    ['body']
  )
)

export const brandNameValidator = validate(
  checkSchema(
    {
      brandName: brandNameSchema
    },
    ['params']
  )
)

export const brandIdValidator = validate(
  checkSchema(
    {
      brandId: {
        custom: {
          options: async (value) => {
            if (!isValidObjectId(value)) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.BAD_REQUEST,
                message: BRAND_MESSAGES.BRAND_ID_MUST_BE_A_VALID_ID
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

export const checkExistedBrandIdValidator = validate(
  checkSchema(
    {
      brandId: {
        custom: {
          options: async (value) => {
            if (!isValidObjectId(value)) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.BAD_REQUEST,
                message: BRAND_MESSAGES.BRAND_ID_MUST_BE_A_VALID_ID
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
