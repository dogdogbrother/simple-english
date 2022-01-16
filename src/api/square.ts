import http from './config'

// 广场列表
export function getSquareList() {
  return http({
    url: '/square',
    method: 'get',
  })
}