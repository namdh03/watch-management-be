import { Request, Response } from 'express'

// [GET] /sign-in
const signInView = async (_req: Request, res: Response) => {
  res.render('sign-in')
}

// [GET] /sign-up
const signUpView = async (_req: Request, res: Response) => {
  res.render('sign-up')
}

export default {
  signInView,
  signUpView
}
