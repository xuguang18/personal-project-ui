import request, { type ApiResult } from './request'

export interface LoginData {
  username: string
}

export function login(username: string, password: string) {
  return request.post<ApiResult<LoginData>, ApiResult<LoginData>>('/login', {
    username,
    password,
  })
}
