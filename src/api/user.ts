import http from './config'

// 用户注册
export function register(data: any) {
  return http({
    url: '/user/register',
    method: 'post',
    data
  })
}

// 用户登录
export function login(data: any) {
  return http({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 用户信息
export function userInfo() {
  return http({
    url: '/user/info',
    method: 'get'
  })
}

// 某个用户信息
export function oneUserInfo(userId: string) {
  return http({
    url: `/user/info/${userId}`,
    method: 'get'
  })
}