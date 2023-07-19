import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useProductStore = defineStore('productStore', {
  state: () => {
    return {
      products: []

    }
  },
  actions: {

  }
})