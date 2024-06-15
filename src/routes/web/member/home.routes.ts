import { Router } from 'express'
import getHomeController from '~/controllers/web/member/home.controller'

const homeRouter = Router()

homeRouter.get('/', getHomeController)

export default homeRouter
