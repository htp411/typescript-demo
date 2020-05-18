import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import path from 'path'
import 'reflect-metadata'
import config from '../config'
import { controller, use, get } from '../decorator'
import { getResult } from '../utils/result'
import Crowller from '../utils/crowller'
import Analyzer from '../utils/analyzer'

interface RequestBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}
interface anyArray {}
// // 判断登录中间件
// const isLogin = (req: Request, res: Response, next: NextFunction): void => {
//   const isLogin = !!(req.session ? req.session.login : undefined)
//   if (isLogin) {
//     next()
//   } else {
//     res.json(getResult(null, '用户未登录'))
//   }
// }
@controller
export class CrowllerController {
  @get('/getdata')
  getData(req: Request, res: Response): void {
    let count: any = req.query.count
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, config.FILE_PATH), 'utf-8'))
    const resultArr: object[] = Object.keys(data).map((key) => ({ data: data[key], time: key }))
    if (count && parseInt(count) > 0) {
      res.send(getResult(resultArr.reverse().slice(0, parseInt(count)), 0))
    } else {
      res.send(getResult(resultArr.reverse(), 0))
    }
    // const resultArr = Object.keys(data).reduce((total, key) => total.concat(data[key]), []) // 这样会拍平数据
  }
  @get('/update')
  updateData(req: Request, res: Response): void {
    const analyzer = Analyzer.getInstance()
    new Crowller(config.TARGET_URL, analyzer)
    res.send(getResult(null, 0))
  }
  // @get('/showdata')
  // showData(req: Request, res: Response): void {
  //   const data = fs.readFileSync(path.resolve(__dirname, Config.FILE_PATH), 'utf-8')
  //   res.json(getResult(JSON.parse(data), 0))
  // }
}
