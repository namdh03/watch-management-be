import { Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { USER_MESSAGES } from '~/constants/messages'
import { TypedRequestBody } from '~/models/requests'
import { SignInReqBody, SignUpReqBody } from '~/models/requests/Auth.requests'
import userService from '~/services/user.service'

// [POST] /users/sign-in
export const signInController = async (req: TypedRequestBody<SignInReqBody>, res: Response) => {
  const { accessToken, refreshToken } = await userService.signIn(req.body)
  res.json({
    message: USER_MESSAGES.SIGN_IN_SUCCESS,
    data: {
      accessToken,
      refreshToken
    }
  })
}

// [POST] /users/sign-up
export const signUpController = async (req: TypedRequestBody<SignUpReqBody>, res: Response) => {
  const { accessToken, refreshToken } = await userService.signUp(req.body)
  res.status(HTTP_STATUS.CREATED).json({
    message: USER_MESSAGES.SIGN_UP_SUCCESS,
    data: {
      accessToken,
      refreshToken
    }
  })
}
