import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import qs from 'querystring'
import store from '@/store'
import { getToken } from './auth'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
service.interceptors.request.use(
  (config): AxiosRequestConfig => {
    config.data = qs.stringify(config.data)
    if (store.getters.token || getToken()) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const { data: res } = response
    if (res.success) {
      return res
    } else {
      return Promise.reject({ code: res.code, errMsg: res.errMsg })
    }
  },
  error => {
    return Promise.reject(error)
  }
)
export default service
