import router from './router'
import store from './store'
import { Route } from 'vue-router'
import { getToken } from './utils/auth'

const whiteList: string[] = ['/login']
router.beforeEach(async (to: Route, from: Route, next) => {
  to.meta.title ? (document.title = to.meta.title) : ''
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})
