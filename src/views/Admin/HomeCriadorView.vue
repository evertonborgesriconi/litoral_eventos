<template>
  <section class="container">
    <div>
      <notifications position="top center" width="600px" />
      <div class="box-nav">
        <div></div>
        <h1>SEUS EVENTOS CADASTRADOS</h1>
        <button type="submit" class="btn" @click="novoEvento()">
          Cadastrar novo evento
        </button>
      </div>
    </div>
    <div class="box-evento" v-if="!loading">
      <EventoCardApp v-for="evento in eventos" :key="evento.evento_id" :evento="evento" :criador="criador"/>
      <div v-if="!eventos">
          <div class="col"><h3>Voce nao tem eventos cadastrados!</h3></div>
      </div>
    </div>
    <div v-else class="centro"><SpinnerApp /></div>
  </section>
</template>

<script>
import router from "@/router";
import { adminApi } from "../../../http/index";
//import { notify } from "@kyvg/vue3-notification";
import SpinnerApp from "../../components/SpinnerApp.vue";
import EventoCardApp from "../../components/EventoCardApp.vue";
export default {
  name: "HomeCriadorView",
  components: { SpinnerApp, EventoCardApp },

  data() {
    return {
      loading: true,
    };
  },

  computed: {
    criador() {
      return this.$store.state.criador;
    },
    eventos() {
      return this.$store.state.eventosCriador;
    },
  },

  created() {
    this.getEventosCriador();
  },

  methods: {
    novoEvento() {
      router.push({
        path: `/deshboard/criador/${this.criador.name}/novo-evento`,
      });
    },
    getEventosCriador() {
      this.loading = true;
      const criador_id = sessionStorage.getItem("criador_id");

      if (criador_id) {
        adminApi
          .get(`/eventosidcriador/${criador_id}`)
          .then((response) => {
            console.log(response.data);
            this.$store.commit("pegaEventosCriador", response.data);
            this.loading = false;
          })
          .catch((error) => {
            var msg = error.response.data.message;
            this.$swal({
              icon: "error",
              title: "Ops algo deu errado!!",
              text: `${msg}`,
            });
          });
      } else {
        this.loading = false;
        router.push({ path: "/login" });
      }
    },
  },
};
</script>

<style scoped>
section {
  margin-top: 30px;
}

.container {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding-top: 15px;
}
.box-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.box-nav h1 {
  font-size: 2.5rem;
  color: #18c07a;
  font-weight: bold;
}

.box-evento {
  margin-top: 1.5rem;
  padding-bottom: 0.5rem;
}

.btn {
  background-color: #18c07a;
  color: #ffffff;
  border-radius: 5px;
  font-size: 1.5rem;
  text-align: center;
}

.btn:hover {
  color: #18c07a;
  background-color: #f8f8fb;
  font-size: 1.6rem;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

.centro {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>