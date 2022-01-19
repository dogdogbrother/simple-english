import { defineStore } from 'pinia'
import { userInfo } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      username: '',
      avatar: '',
      id: '',
      introduce: '',  // 个人简介
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
    }
  }
})