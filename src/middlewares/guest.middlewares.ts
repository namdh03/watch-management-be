import { NextFunction, Request, Response } from 'express'
import { MemberDocument } from '~/models/schemas/Member.schema'

export const guestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as MemberDocument
  if (user) return res.redirect(`${req.headers.referer || '/'}`)
  next()
}
