import instance from '@/utils/request.js'

const login = {
  // 登录接口
  login (params) {
    return instance.post(`/login`, params)
  }
}
export default login
