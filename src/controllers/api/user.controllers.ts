import { Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { USER_MESSAGES } from '~/constants/messages'
import { TypedRequestBody } from '~/models/requests'
import { SignInReqBody, SignOutReqBody, SignUpReqBody, TokenPayload } from '~/models/requests/Auth.requests'
import { MemberReqParams } from '~/models/requests/Member.requests'
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

// [GET] /users/:memberName
export const meController = async (req: Request, res: Response) => {
  const { userId } = req.decodeAuthorization as TokenPayload
  const user = await userService.getMe(userId)
  res.json({
    message: USER_MESSAGES.GET_ME_SUCCESS,
    data: user
  })
}
