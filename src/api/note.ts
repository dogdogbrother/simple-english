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

// 选择单词本
export function useNote(noteId: any) {
  return http({
    url: `/note/useNote/${noteId}`,
    method: 'put',
  })
}

// 获取当前用户使用的单词本
export function getUseNote() {
  return http({
    url: `/note/useNote`,
    method: 'get',
  })
}
