import { Response } from 'express'
import { USER_MESSAGES } from '~/constants/messages'
import { TypedRequestBody } from '~/models/requests'
import { SignInReqBody } from '~/models/requests/Auth.requests'
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
