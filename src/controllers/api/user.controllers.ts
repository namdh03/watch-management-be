import { Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { USER_MESSAGES } from '~/constants/messages'
import { TypedRequestBody } from '~/models/requests'
import { SignInReqBody, SignOutReqBody, SignUpReqBody } from '~/models/requests/Auth.requests'
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

// [POST] /users/sign-out
export const signOutController = async (req: TypedRequestBody<SignOutReqBody>, res: Response) => {
  await userService.signOut(req.body.refreshToken)
  res.json({
    message: USER_MESSAGES.SIGN_OUT_SUCCESS
  })
}
