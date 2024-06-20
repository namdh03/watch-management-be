import express from 'express'
import { create } from 'express-handlebars'
import session from 'express-session'
import flash from 'express-flash-message'
import cookieParser from 'cookie-parser'
import methodOverride from 'method-override'
import databaseService from './services/database.service'
import webRoutes from './routes/web'
import registerHelperHbs from './utils/registerHelperHbs'
import { PORT } from './constants/env'

const app = express()
const hbs = create({
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  },
  helpers: registerHelperHbs
})

databaseService.connect()
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set('views', `${__dirname}/views`)
app.enable('view cache')
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
app.use(express.static(`${__dirname}/public`))

// setup express-session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
      // secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
    }
  })
)

// setup flash
app.use(
  flash({
    sessionKeyName: 'express-flash-message',
    // below are optional property you can pass in to track
    onAddFlash: (type, message) => {},
    onConsumeFlash: (type: string, messages: string[]) => {}
  })
)

// Routes
webRoutes(app)

app.listen(PORT)
