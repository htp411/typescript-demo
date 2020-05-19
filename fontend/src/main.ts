import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import notify from '@/components/notification'

import './promission'
import '@/assets/styles/reset.scss'
Vue.config.productionTip = false
Vue.use(notify)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
