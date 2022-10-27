import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueTheMask from 'vue-the-mask'
import Notifications from '@kyvg/vue3-notification'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import store from "./store";
import VueGoogleMaps from '@fawmi/vue-google-maps'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

createApp(App)
.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAb3CYZqmTuvQSWBiUSnK-ebRHU_9U1mio',
        libraries: "places"
        
    },
    autobindAllEvents: false,
})
.use(router)
.use(VueTheMask)
.use(VueSweetalert2)
.use(Notifications)
.use(store)
.mount('#app')
