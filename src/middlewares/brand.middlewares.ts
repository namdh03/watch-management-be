import { Request } from 'express'
import { ParamSchema, checkSchema } from 'express-validator'
import { isValidObjectId } from 'mongoose'
import HTTP_STATUS from '~/constants/httpStatus'
import { BRAND_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import brandService from '~/services/brand.service'
import validate from '~/utils/validate'

const brandSchema: ParamSchema = {
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

export const createBrandValidator = validate(
  checkSchema(
    {
      brandName: {
        ...brandSchema,
        custom: {
          options: async (value) => {
            const result = await brandService.checkExistedBrandName({ brandName: value })

            if (result) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.BAD_REQUEST,
                message: BRAND_MESSAGES.BRAND_NAME_ALREADY_EXISTS
              })
            }

            return true
          }
        }
      }
    },
    ['body']
  )
)

export const checkExistedBrandNameValidator = validate(
  checkSchema(
    {
      brandName: {
        ...brandSchema,
        custom: {
          options: async (value, { req }) => {
            const result = await brandService.getBrandByName({ brandName: value })

            if (!result) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: BRAND_MESSAGES.BRAND_NAME_DOES_NOT_EXIST
              })
            }

            ;(req as Request).brand = result

            return true
          }
        }
      }
    },
    ['params']
  )
)

export const updateBrandValidator = validate(
  checkSchema(
    {
      brandName: brandSchema
    },
    ['body']
  )
)

export const checkExistedBrandIdValidator = validate(
  checkSchema(
    {
      brandId: {
        custom: {
          options: async (value, { req }) => {
            if (!isValidObjectId(value)) {
              ;(req as Request).page = '/admin/brand'

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
