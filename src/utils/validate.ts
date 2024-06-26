import express from 'express'
import { ContextRunner, validationResult } from 'express-validator'

import HTTP_STATUS from '~/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '~/models/errors'

const validate = (validations: ContextRunner[]) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)))

    const errors = validationResult(req)
    const errorsObject = errors.mapped()
    const entityErrors = new EntityError({ error: errorsObject })

    if (!errors.isEmpty()) {
      for (const key in errorsObject) {
        const { msg } = errorsObject[key]

        if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
          return next(msg)
        }

        entityErrors.error[key] = errorsObject[key]
      }

      return next(entityErrors)
    }

    next()
  }
}

export default validate
