import createError, { HttpError } from 'http-errors'
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import './controller/loginController'
import './controller/crollerController'
import { router } from './routes'
import { getResult } from './utils/result'
import jwtAuth from './utils/auth'

const app = express()

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')

app
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(function (req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'content-type, authorization')
    res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
    if (req.method === 'OPTIONS') {
      // console.log('预检请求')
      res.status(200)
      res.send('OK')
    } else {
      next()
    }
  })
  .use(jwtAuth)
  .use(router)
  // catch 404 and forward to error handler

  .use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404))
  })

  // error handler
  .use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.send(getResult(null, err.status, 'error'))
  })

export default app
