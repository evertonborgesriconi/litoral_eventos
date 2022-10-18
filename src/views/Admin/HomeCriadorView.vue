<template>
  <section>
    <div class="box-evento">
      <button type="submit" class="btn" @click="novoEvento()">Cadastrar novo evento</button>

      <h1>SEUS EVENTOS CADASTRADOS</h1>
      <div></div>
    </div>
  </section>
</template>

<script>
import router from "@/router";
export default {
  name: "HomeCriadorView",

  computed: {
    criador() {
      return this.$store.state.criador;
    },
  },
  
  methods:{
    novoEvento(){
      router.push({ path: `/deshboard/criador/:${this.criador.name}/novoevento` });
    }
  }

  
};
</script>

<style scoped>
section {
  margin-top: 30px;
}
.box-evento {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.box-evento h1 {
  font-size: 2rem;
  color: #18c07a;
  ont-weight: bold;
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
</style>