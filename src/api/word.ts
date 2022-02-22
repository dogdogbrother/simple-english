import http from './config'

// 添加单词
export function addWord(data: any) {
  return http({
    url: '/word/add',
    method: 'post',
    data
  })
}

// 获取单词本单词
export function getNoteWord(noteId: number | string) {
  return http({
    url: `/word/list/${noteId}`,
    method: 'get',
  })
}

// 检查单词本单词
export function checkNoteWord(noteId: number | string, word: String) {
  return http({
    url: `/word/${noteId}/${word}`,
    method: 'get'
  })
}

// 获取单词的有道翻译内容
export function getYoudao(data: any) {
  return http({
    url: `/word/youdao`,
    method: 'post',
    data
  })
}

// 陌生 已掌握 模糊 认识
export type wordPlanActionType = 0 | 1 | 2 | 3
interface wordPlanParamsType {
  keyWord: string,
  action: wordPlanActionType,  
}
export function setWordPlan(data: wordPlanParamsType) {
  return http({
    url: `/word/plan`,
    method: 'put',
    data
  })
}

// 获取单词本的用户们
export function getWordUseUser(noteId: string) {
  return http({
    url: `/word/useUser`,
    method: 'get',
    params: { noteId }
  })
}


