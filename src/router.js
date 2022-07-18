import {createRouter, createWebHistory  } from "vue-router";

import HelloWorld from "./components/HelloWorld.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path:"/home", name:'home', component: HelloWorld}
    ]
})

export default router