import { Router } from 'express'
import memberControllers from '~/controllers/web/member.controllers'
import { wrapRequestHandler } from '~/utils/handlers'

const memberRouter = Router()

/**
 * Description. Get members page
 * Path: /members
 * Method: GET
 */
memberRouter.get('/', wrapRequestHandler(memberControllers.memberView))

export default memberRouter
