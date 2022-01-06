import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: ''
  }),
  getters: {},
  actions: {
    setUserInfo(data: string) {
      this.username = data
    }
  }
})