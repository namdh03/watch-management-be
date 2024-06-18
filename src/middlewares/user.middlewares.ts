import { ParamSchema, checkSchema } from 'express-validator'
import { USER_MESSAGES } from '~/constants/messages'
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

export const loginValidator = validate(
  checkSchema({
    memberName: memberNameSchema,
    password: passwordSchema
  })
)

export const registerValidator = validate(
  checkSchema(
    {
      memberName: {
        ...memberNameSchema
        // custom: {
        //   options: async (value) => {
        //     const member = await userService.checkExistedMemberName(value)

        //     if (member) {
        //       throw new Error(USER_MESSAGES.MEMBER_NAME_ALREADY_EXISTS)
        //     }

        //     return true
        //   }
        // }
      },
      password: passwordSchema
    },
    ['body']
  )
)
