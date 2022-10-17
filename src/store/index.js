import { createStore } from "vuex";

export default createStore({
    state: {
        criador: {}
    },
    getters: {

    },
    mutations: {

        pegaCriador (state, payload) {
            state.criador = payload
        }


    },
    actions: {

    },

})