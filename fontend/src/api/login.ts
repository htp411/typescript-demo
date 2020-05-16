import axios from '@/utils/request'
import { AxiosPromise } from 'axios'
import md5 from 'md5'

export function login(password: string, isRemenber: boolean): AxiosPromise {
  return axios({
    url: '/login',
    method: 'post',
    data: {
      password: md5(password),
      isRemenber
    }
  })
}
