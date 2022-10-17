import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "../views/LoginView.vue"
import RegisterCriadorView from "../views/RegisterCriadorView.vue"
import DashbordView from "../views/Admin/DashbordView.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterCriadorView
  },
  {
    path: '/deshboard/criador/:username',
    name: 'deshboard',
    props: true,
    component: DashbordView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
