import { createStore } from "vuex";

export default createStore({
    state: {
        criador: {},
        eventosCriador: []
    },
    getters: {

    },
    mutations: {

        pegaCriador (state, payload) {
            state.criador = payload
        },

        pegaEventosCriador (state, payload) {
            state.eventosCriador = payload
        }


    },
    actions: {

    },

})