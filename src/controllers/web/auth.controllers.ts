import { Request, Response } from 'express'

import { TypedRequestBody } from '~/models/requests'
import { SignInReqBody, SignUpReqBody } from '~/models/requests/Auth.requests'
import userService from '~/services/user.service'

// [GET] /sign-in
const signInView = async (req: Request, res: Response) => {
  res.cookie('prevUrl', req.headers.referer || '/', { httpOnly: true })
  res.render('sign-in', { layout: 'auth', title: 'Node.js | Sign In' })
}

// [POST] /sign-in
const signIn = async (req: TypedRequestBody<SignInReqBody>, res: Response) => {
  const { accessToken, refreshToken } = await userService.signIn(req.body)
  res.cookie('accessToken', accessToken, { httpOnly: true })
  res.cookie('refreshToken', refreshToken, { httpOnly: true })
  res.redirect(`${req.cookies.prevUrl || '/'}`)
}

// [GET] /sign-up
const signUpView = async (req: Request, res: Response) => {
  res.cookie('prevUrl', req.headers.referer || '/', { httpOnly: true })
  res.render('sign-up', { layout: 'auth', title: 'Node.js | Sign Up' })
}

// [POST] /sign-up
const signUp = async (req: TypedRequestBody<SignUpReqBody>, res: Response) => {
  const { accessToken, refreshToken } = await userService.signUp(req.body)
  res.cookie('accessToken', accessToken, { httpOnly: true })
  res.cookie('refreshToken', refreshToken, { httpOnly: true })
  res.redirect(`${req.cookies.prevUrl || '/'}`)
}

// [POST] /sign-out
const signOut = async (req: Request, res: Response) => {
  await userService.signOut(req.cookies.refreshToken)
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')
  res.redirect('/')
}

export default {
  signInView,
  signIn,
  signUpView,
  signUp,
  signOut
}
