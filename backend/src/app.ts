import createError, { HttpError } from 'http-errors'
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import logger from 'morgan'
import './controller/loginController'
import './controller/crollerController'
import { router } from './routes'
import { getResult } from './utils/result'
import Config from './config/config'

const app = express()

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  cookieSession({
    name: 'session',
    // 是个数组 每一次请求会循环去一个数值进行加密
    keys: Config.SESSION_KEYS,
    maxAge: 1000 * 60 * 60 * 24,
  })
)
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'content-type')
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  next()
})
app.use(router)
// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404))
})

// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send(getResult(null, 'error'))
})

export default app
