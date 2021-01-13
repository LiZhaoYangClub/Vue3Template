import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getToken, removeToken } from '@/utils/auth'
import { ElMessage } from 'element-plus'

const noAuth = () => {
  ElMessage.error('没有访问权限，请重新登录！')
  const location: string = window.location.href.split('?')[0]
  const list: Array<string> = location.split('/')
  if (!list.includes('login')) {
    removeToken()
    window.location.reload()
  }
}

export const service: AxiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? (window as any).BASE_CONFIG.BASE_API : '',
  timeout: 5000
})

service.interceptors.request.use((config: AxiosRequestConfig) => {
  if (getToken()) {
    // config.headers['X-Token'] = getToken()
    config.headers.Authorization = 'Bearer ' + getToken()
  }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use((response: AxiosResponse) => {
  const { status, data } = response
  if (status === 200) {
    return data ?? {}
  } else if (status === 401) {
    return noAuth()
  } else {
    return ElMessage.error('服务器异常，请稍后再试！')
  }
}, error => {
  const reg401 = /401/
  const reg500 = /500/
  if (reg401.test(error)) {
    return noAuth()
  }
  if (reg500.test(error)) {
    return ElMessage.error('服务器异常，请稍后再试！')
  }
  return Promise.reject(error)
})
