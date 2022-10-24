import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "../views/LoginView.vue"
import RegisterCriadorView from "../views/RegisterCriadorView.vue"
import DashbordView from "../views/Admin/DashbordView.vue"
import NovoEventoView from "../views/Admin/NovoEventoView.vue"
import HomeCriadorView from "../views/Admin/HomeCriadorView.vue"
import EditarEventoView from "../views/Admin/EditarEventoView.vue"

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
    component: DashbordView,
    children: [
      {
        path: '',
        name: 'HomeCriador',
        props: true,
        component: HomeCriadorView,
      },
      {
        path: '/deshboard/criador/:username/novo-evento',
        name: 'NovoEvento',
        props: true,
        component: NovoEventoView,
      },
      {
        path: '/deshboard/criador/:username/editar-evento/:id',
        name: 'EditarEvento',
        props: true,
        component: EditarEventoView,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
