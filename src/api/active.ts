import http from './config'

// 获取全年的活跃天数
export function getYearAllActive(year: string, userId: string) {
  return http({
    url: `/active/${year}`,
    method: 'get',
    params: { userId }
  })
}