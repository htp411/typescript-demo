import { Request, Response } from 'express'
import 'reflect-metadata'
import { getResult } from '../utils/result'
import { controller, get, post } from '../decorator'
import jwt from 'jsonwebtoken'
import config from '../config'

interface RequestBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}
@controller
export class LoginController {
  @post('/login')
  login(req: RequestBody, res: Response) {
    const { password, isRemenber } = req.body
    console.log(typeof isRemenber)
    const isLogin = !!(req.session ? req.session.login : undefined)
    if (password === 'fd84255c3ab467de784f50a097672fc0') {
      const token = jwt.sign(
        {
          exp: isRemenber === 'false' ? Math.floor(Date.now() / 1000 + 60) : config.getJwtExpireTime(),
          loginTime: Date.now(),
        },
        config.JWT_PRIVATE_KEY
      )
      res.send(getResult(token, 0))
    } else {
      res.send(getResult(null, 401, 'password error'))
    }
  }
  @get('/logout')
  logout(req: Request, res: Response) {
    req.session ? (req.session.login = undefined) : ''
    res.json(getResult(null, 0))
  }
  @get('/')
  home(req: Request, res: Response) {
    const isLogin = req.session ? req.session.login : undefined
    if (isLogin) {
      res.send(`
          <a href="/getdata">抓取数据</a>
          <a href="/showdata">查看数据</a>
        `)
      return
    }
    res.send(`
      <html>
        <body>
          <form action="/login" method="post">
            <input placeholder="请输入密码" name="password" />
            <button type="submit">登录</button>
          </form>
        </body>
      </html>
    `)
  }
}
