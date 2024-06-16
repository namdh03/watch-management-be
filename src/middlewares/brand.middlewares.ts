import { checkSchema } from 'express-validator'
import HTTP_STATUS from '~/constants/httpStatus'
import { BRAND_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import brandService from '~/services/brand.service'
import validate from '~/utils/validate'

export const createBrandValidator = validate(
  checkSchema(
    {
      brandName: {
        notEmpty: {
          errorMessage: BRAND_MESSAGES.BRAND_NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: BRAND_MESSAGES.BRAND_NAME_MUST_BE_A_STRING
        },
        trim: true,
        custom: {
          options: async (value) => {
            const result = await brandService.checkExistedBrandName({ brandName: value })

            if (result)
              throw new ErrorWithStatus({
                status: HTTP_STATUS.BAD_REQUEST,
                message: BRAND_MESSAGES.BRAND_NAME_ALREADY_EXISTS
              })

            return true
          }
        }
      }
    },
    ['body']
  )
)
