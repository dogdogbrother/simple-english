import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    avatar: '',
  }),
  getters: {},
  actions: {
    setUserInfo(data: any) {
      const { username, avatar } = data
      this.username = username
      this.avatar = avatar
    }
  }
})