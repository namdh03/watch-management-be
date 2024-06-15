import express from 'express'
import { create } from 'express-handlebars'
import databaseService from './services/database.service'
import webMemberRoutes from './routes/web/member'

const app = express()
const hbs = create({
  extname: '.hbs',
  defaultLayout: `${__dirname}/views/member/layouts/main.hbs`,
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
})

databaseService.connect()
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set('views', `${__dirname}/views`)
app.enable('view cache')
app.use(express.static(`${__dirname}/public`))

// Routes
webMemberRoutes(app)

app.listen(3000)
