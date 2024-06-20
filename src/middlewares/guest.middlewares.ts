import { NextFunction, Request, Response } from 'express'
import { MemberDocument } from '~/models/schemas/Member.schema'

export const guestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as MemberDocument
  if (user) {
    const referer = req.headers.referer
    if (referer && !referer.includes('sign-in') && !referer.includes('sign-up')) {
      return res.redirect(`${req.headers.referer}`)
    } else {
      return res.redirect('/')
    }
  }
  next()
}
