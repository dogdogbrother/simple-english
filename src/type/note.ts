import { userInfoType } from './user'


// 单词本
export interface noteType {
  createdAt: string,
  id: number | string,
  noteCover: string,
  noteName: string,
  noteSummary: string,
  userId: number | string,
  wordCount: number | string,
  user: userInfoType
}