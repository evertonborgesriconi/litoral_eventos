<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid"></div>
    </nav>
  </div>
</template>

<script>
import { adminApi } from "../../../http/index";
import router from "@/router";
export default {
  name: "DashbordView",
  props: ['username'],
  data() {
    return {
      criador: {
        email: "",
        password: "",
      },

      errors: "",
      loading: true,
    };
    
  },
  created() {
    this.getCriador();
  },

  methods: {
    getCriador() {
      this.loading = false;
      const criador_id = sessionStorage.getItem('id_criador');

      if (criador_id) {
         adminApi
        .get(`criador/${criador_id}`, this.criador)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.request.response);
        });
      }else{
        router.push({ path: "/login" });
      }


     
    },
  },
};
</script>

<style scoped>
</style>