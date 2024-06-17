import express from 'express'
import { create } from 'express-handlebars'
import { HelperOptions } from 'handlebars'
import databaseService from './services/database.service'
import webRoutes from './routes/web'

const app = express()
const hbs = create({
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  },
  helpers: {
    ifEquals: function (arg1: unknown, arg2: unknown, options: HelperOptions) {
      return arg1 == arg2 ? options.fn(this) : options.inverse(this)
    }
  }
})

databaseService.connect()
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set('views', `${__dirname}/views`)
app.enable('view cache')
app.use(express.json())
app.use(express.static(`${__dirname}/public`))

// Routes
webRoutes(app)

app.listen(3000)
