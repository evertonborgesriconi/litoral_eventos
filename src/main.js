import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueTheMask from 'vue-the-mask'
import Notifications from '@kyvg/vue3-notification'
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

createApp(App)
.use(router)
.use(VueTheMask)
.use(Notifications)
.use(store)
.mount('#app')
