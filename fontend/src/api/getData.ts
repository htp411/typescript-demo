import axios from '@/utils/request'
import { AxiosPromise } from 'axios'

export function getData(count?: number): AxiosPromise {
  return axios({
    url: '/getdata',
    method: 'get',
    params: {
      count
    }
  })
}
export function updateData(): AxiosPromise {
  return axios({
    url: '/update',
    method: 'get'
  })
}
