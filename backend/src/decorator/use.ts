import { RequestHandler } from 'express'
import { CrowllerController, LoginController } from '../controller'

export function use(middleware: RequestHandler) {
  return function (target: CrowllerController | LoginController, key: string) {
    const middlewares = Reflect.getMetadata('meddlewares', target, key) || []
    middlewares.push(middleware)
    Reflect.defineMetadata('middlewares', middlewares, target, key)
  }
}
