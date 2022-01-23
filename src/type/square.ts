import { userInfoType } from './user'
import { noteType } from './note'

type squareType_ = "1" | "2"  // 1是注册用户 2是创建单词本

// 广场信息
export interface squareType {
  createdAt: string,
  id: string | number,
  note: noteType,
  noteId: string | number,
  type: squareType_,
  user: userInfoType,
  userId: string | number
}

