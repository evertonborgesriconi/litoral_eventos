<template>
  <section>
    <div v-if="!loading">
      <nav>
        <div class="clickable" @click="getHome()">
          Bem vindo!! {{ criador.name }}
        </div>
        <button type="submit" class="btn">Meu perfil</button>
      </nav>
      <div class="container-fluid">
        <router-view />
      </div>
    </div>
    <div v-else class="centro">
      <SpinnerApp />
    </div>
  </section>
</template>

<script>
import { adminApi } from "../../../http/index";
import router from "@/router";
import SpinnerApp from "../../components/SpinnerApp.vue";

export default {
  name: "DashbordView",
  props: ["username"],
  components: { SpinnerApp },
  data() {
    return {
      loading: false,
    };
  },
  created() {
    this.getCriador();

  },

  computed: {
    criador() {
      return this.$store.state.criador;
    },
  },
  methods: {
    getHome() {
      router.push({ path: `/deshboard/criador/:${this.criador.name}` });
    },
    getCriador() {
      this.loading = true;
      const criador_id = sessionStorage.getItem("criador_id");

      if (criador_id) {
        adminApi
          .get(`criador/${criador_id}`)
          .then((response) => {
            this.$store.commit("pegaCriador", response.data);
            this.loading = false;
          })
          .catch((error) => {
            console.log(error.request.response);
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
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #4b48480f;
  width: 100%;
  font-size: 2.9rem;
  font-weight: bold;
  color: #18c07a;
  padding-left: 1rem;
  padding-right: 1rem;
}
.btn {
  background-color: #18c07a;
  color: #ffffff;
  border-radius: 5%;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}
.clickable {
  cursor: pointer;
}

.btn:hover {
  color: #04683e;
}

.centro {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>