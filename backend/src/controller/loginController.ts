import { Request, Response } from 'express'
import 'reflect-metadata'
import { getResult } from '../utils/result'
import { controller, get, post } from '../decorator'
interface RequestBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}
@controller
export class LoginController {
  @post('/login')
  login(req: RequestBody, res: Response) {
    const { password } = req.body
    console.log(req.body)
    const isLogin = !!(req.session ? req.session.login : undefined)
    if (isLogin) {
      res.send('已登录')
    } else {
      console.log(password)
      if (password === 'e10adc3949ba59abbe56e057f20f883e') {
        req.session ? (req.session.login = true) : ''
        res.send(getResult(null))
      } else {
        res.json(getResult(null, 'password error'))
      }
    }
  }
  @get('/logout')
  logout(req: Request, res: Response) {
    req.session ? (req.session.login = undefined) : ''
    res.json(getResult(null))
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
