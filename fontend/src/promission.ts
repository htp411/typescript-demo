import router from './router'
import store from './store'
import { Route } from 'vue-router'

const whiteList: string[] = ['/login']
router.beforeEach(async (to: Route, from: Route, next: () => void) => {
  document.title = to.meta.title
  next()
})
