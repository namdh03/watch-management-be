import { Router } from 'express'
import memberControllers from '~/controllers/web/member.controllers'

const memberRouter = Router()

/**
 * Description. Get members page
 * Path: /
 * Method: GET
 */
memberRouter.get('/', memberControllers.memberView)

export default memberRouter
