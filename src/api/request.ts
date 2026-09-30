import axios from 'axios'

export interface ApiResult<T = unknown> {
  code: number
  message: string
  data: T
}

const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message: string = error.response?.data?.message ?? '网络异常，请稍后重试'
    return Promise.reject(new Error(message))
  },
)

export default request
