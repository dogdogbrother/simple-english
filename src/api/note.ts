import http from './config'

// 获取单词本列表
export function getNoteList(params?: any) {
  return http({
    url: '/note',
    method: 'get',
    params
  })
}

// 增加单词本
export function addNote(data: any) {
  return http({
    url: '/note',
    method: 'post',
    data
  })
}