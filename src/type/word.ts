export type planType = "1" | "2" | "3" | "4" | "5" | "6" 
// 单词内容
export interface wordType {
  createdAt: string,
  id: number | string,
  fileList: string,
  keyWord: string,
  word: string,
  wordMark: string,
  plan: planType,
  youdao: youdaoType
}

export interface phoneticType {
  ukPhonetic?: string,
  ukSpeech?: string,
  usPhonetic?: string,
  usSpeech?: string
}

export interface youdaoType extends phoneticType{
  isWord?: boolean,
  explains?: string[],
  webdict?: string,
  word?: string,
  translation?: string
}