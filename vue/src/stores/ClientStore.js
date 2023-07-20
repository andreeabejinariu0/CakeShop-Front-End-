import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useClientStore = defineStore('clientStore', {
  state: () => {
    return {
      clientName: Cookies.get('clientName') || "",
      clientToken:  Cookies.get('userToken') || "", 
      admin:  Cookies.get('admin') || "false"
    }
  },
  actions: {
    setClientName(name) {
      //setarea numelui clientului
      this.clientName = String(name)

      Cookies.set('clientName', this.clientName.toString())
    },
    setClientToken(token) {
      //setare token client
      this.clientToken = String(token)

      Cookies.set('userToken', this.clientToken.toString())
    },
    setAdmin(isAdmin) {
      //setarea numelui clientului
      this.admin = String(isAdmin)

      Cookies.set('admin', this.admin.toString())
    },
  }
})