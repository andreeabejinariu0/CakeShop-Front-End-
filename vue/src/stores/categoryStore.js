import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useCategoryStore = defineStore('categoryStore', {
  state: () => {
    return {
      categories: []

    }
  },
  actions: {

  }
})