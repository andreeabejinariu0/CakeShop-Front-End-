import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: "/about",
        name: "about",
        component: () => import("../components/AboutView.vue"),
      },
      {
        path: "/menu",
        name: "menu",
        component: () => import("../components/MenuView.vue"),
      },
      {
        path: "/contact",
        name: "contact",
        component: () => import("../components/ContactView.vue"),
      },

      {
        path: "/history",
        name: "history",
        component: () => import("../components/HistoryOrder.vue"),
      },
    {
      path: "/register",
      name: "register",
      component: () => import("../components/Register.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../components/LoginView.vue"),
      },
      {
        path: "/order",
        name: "order",
        component: () => import("../components/SendOrderView.vue"),
      },

  ]
})

export default router