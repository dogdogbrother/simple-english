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