<template>
  <section>
    <nav>
      <div class="btn1">Bem vindo!! {{ criador.name }}</div>

      <button type="submit" class="btn">Meu perfil</button>
    </nav>
    {{ criador }}
  </section>
</template>

<script>
import { adminApi } from "../../../http/index";
import router from "@/router";
//import SpinnerApp from "../../components/SpinnerApp.vue";

export default {
  name: "DashbordView",
  props: ["username"],
  //   components: { SpinnerApp },
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
    getCriador() {
      this.loading = false;
      const criador_id = sessionStorage.getItem("id_criador");

      if (criador_id) {
        adminApi
          .get(`criador/${criador_id}`, this.criador)
          .then((response) => {
            console.log(response.data);
            this.$store.commit("pegaCriador", response.data);
            this.loading = true;
          })
          .catch((error) => {
            console.log(error.request.response);
          });
      } else {
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
</style>