import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      users: []

    }
  },
  actions: {

  }
})