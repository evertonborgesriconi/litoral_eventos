<template>
  <section>
    <div>
      <notifications position="top center" width="600px" />
      <div class="box-nav">
        <button type="submit" class="btn" @click="novoEvento()">
          Cadastrar novo evento
        </button>

        <h1>SEUS EVENTOS CADASTRADOS</h1>
        <div></div>
      </div>
    </div>
    <div class="box-evento" v-if="!loading">
      {{ eventos }}
    </div>
    <div v-else class="centro"><SpinnerApp /></div>
  </section>
</template>

<script>
import router from "@/router";
import { adminApi } from "../../../http/index";
import { notify } from "@kyvg/vue3-notification";
import SpinnerApp from "../../components/SpinnerApp.vue";
export default {
  name: "HomeCriadorView",
  components: { SpinnerApp },

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
        path: `/deshboard/criador/:${this.criador.name}/novoevento`,
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
            console.log(error.request.response);
            notify({
              type: "error",
              text: error.request.response.message,
            });

            this.getEventosCriador();
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
.box-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.box-nav h1 {
  font-size: 2rem;
  color: #18c07a;
  font-weight: bold;
}

.box-evento {
  margin-top: 1.5rem;
}

.btn {
  background-color: #18c07a;
  color: #ffffff;
  border-radius: 5%;
  font-size: 1.5rem;
  text-align: center;
}

.btn:hover {
  color: #18c07a;
  background-color: #f8f8fb;
}

.centro {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>