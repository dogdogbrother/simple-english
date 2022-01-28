
// 登录
export interface loginType{
  username: string,
  password: string
}

// 注册
export interface registerType extends loginType{
  affirmPassword: string
}

export interface _userInfoType {
  avatar: string,
  id: number | string,
  nickname: string,
  token?: string,
  introduce: string,
  allWord: number,
  masterWord: number,
  username: string,
}
export type userInfoType = Partial<_userInfoType>