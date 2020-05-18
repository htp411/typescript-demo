import Vue from 'vue'
import Vuex, { ActionContext, Store } from 'vuex'
import { setToken } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  getters: {
    token(state) {
      return state.token
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {},
  modules: {}
})
