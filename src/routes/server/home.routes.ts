import { Router } from 'express'
import getHomeController from '~/controllers/server/home.controller'

const homeRouter = Router()

homeRouter.get('/', getHomeController)

export default homeRouter
