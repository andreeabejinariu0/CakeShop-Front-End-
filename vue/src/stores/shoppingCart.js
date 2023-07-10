import { defineStore } from 'pinia'

localStorage.setItem('cartProducts', JSON.stringify([]))
localStorage.setItem('total', 0)

export const useShoppingCartStore = defineStore('shoppingCart', () => {
  const shoppingCart = JSON.parse(localStorage.getItem('cartProducts'));
  const total = localStorage.getItem('total', 0);
  return { shoppingCart , total}
})