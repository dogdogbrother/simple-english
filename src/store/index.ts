import { defineStore } from 'pinia'
import { userInfo } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      username: '',
      avatar: '',
      id: '',
      introduce: '',  // 个人简介
      useNote: '',  // 正在学习中的单词本id
      autoPlay: [] as string[],  // 是否自动播放,有两个地方的开关
      defaultPhonetic: 'us' as 'us' | 'uk',  // 默认音标
    }
  }),
  getters: {
    getUserInfo(state) {
      return state.userInfo
    }
  },
  actions: {
    async setUserInfo() {
      this.userInfo = await userInfo() as any
    },
    updateUserInfo(userInfo: any) {
      this.userInfo = userInfo
    }
  }
})