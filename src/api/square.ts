import http from './config'

// 广场列表
export function getSquareList(params?: any) {
  return http({
    url: '/square',
    method: 'get',
    params
  })
}