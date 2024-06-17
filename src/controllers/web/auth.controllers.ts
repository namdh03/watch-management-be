import { Request, Response } from 'express'
import { TypedRequestBody } from '~/models/requests'
import { AuthReqBody } from '~/models/requests/Auth.requests'
import userService from '~/services/user.service'

// [GET] /sign-in
const signInView = async (_req: Request, res: Response) => {
  res.render('sign-in')
}

// [GET] /sign-up
const signUpView = async (_req: Request, res: Response) => {
  res.render('sign-up')
}

// [POST] /sign-up
const signUp = async (req: TypedRequestBody<AuthReqBody>, res: Response) => {
  const { accessToken, refreshToken } = await userService.registerUser(req.body)

  res.cookie('accessToken', accessToken, { httpOnly: true })
  res.cookie('refreshToken', refreshToken, { httpOnly: true })
  res.render('home')
}

export default {
  signInView,
  signUpView,
  signUp
}
