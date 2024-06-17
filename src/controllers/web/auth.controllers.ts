import { Request, Response } from 'express'

// [GET] /sign-in
const signInView = async (_req: Request, res: Response) => {
  res.render('sign-in')
}

export default {
  signInView
}
