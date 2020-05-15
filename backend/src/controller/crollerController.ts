import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import path from 'path'
import 'reflect-metadata'
import Config from '../config/config'
import { controller, use, get } from '../decorator'
import { getResult } from '../utils/result'
import Crowller from '../utils/crowller'
import Analyzer from '../utils/analyzer'

interface RequestBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}
// 判断登录中间件
const isLogin = (req: Request, res: Response, next: NextFunction): void => {
  const isLogin = !!(req.session ? req.session.login : undefined)
  if (isLogin) {
    next()
  } else {
    res.json(getResult(null, '用户未登录'))
  }
}
@controller
export class CrowllerController {
  @get('/getdata')
  @use(isLogin)
  getData(req: Request, res: Response): void {
    const url = Config.TARGET_URL
    new Crowller(url, Analyzer.getInstance())
    res.send(getResult(null))
  }
  @get('/showdata')
  @use(isLogin)
  showData(req: Request, res: Response): void {
    const data = fs.readFileSync(path.resolve(__dirname, Config.FILE_PATH), 'utf-8')
    res.json(getResult(JSON.parse(data)))
  }
}
