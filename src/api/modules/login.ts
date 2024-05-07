import type { Login } from '@/api/interface/index.type'
import http from '@/api'

/**
 * @name 登录模块
 */
// 用户登录
export const loginApi = (params: Login.ReqLoginForm) => {
  // 正式服务器
  return http.post<Login.ResLogin>('/api/Mk_Login/_login', {
    UNAME: params.username,
    PWD: params.password
  })

}
