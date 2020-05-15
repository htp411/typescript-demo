import { RequestHandler } from 'express'
import { Methods } from './request'
import { router } from '../routes'
export function controller(target: new (...args: any[]) => any) {
  for (let key in target.prototype) {
    const path: string = Reflect.getMetadata('path', target.prototype, key)
    const method: Methods = Reflect.getMetadata('method', target.prototype, key)
    const handler = target.prototype[key]
    const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', target.prototype, key)
    if (path && method) {
      if (middlewares && middlewares.length) {
        router[method](path, ...middlewares, handler)
      } else {
        router[method](path, handler)
      }
    }
  }
}
