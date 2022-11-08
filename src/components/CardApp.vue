<template>
  <div class="card-evento" @click="infoEvento()">
    <div class="card">
      <img class="card-img-top" :src="url + evento.imagem_evento" alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title">{{evento.titulo_evento}}</h5>
        <p class="card-text">
          <i class="fa-solid fa-calendar-days"></i> Data Inicio: {{ data_inicio }}  {{ hora_inicio }}
        </p>
        <p class="card-text">
          <i class="fa-solid fa-calendar-days"></i> Data Termino: {{ data_termino }}  {{ hora_termino }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
export default {
  name: "CardApp",
  props: ["evento"],
  data(){
    return {
      data_inicio: "",
      hora_inicio: "",
      data_termino: "",
      hora_termino: "",
      url:"https://api.litoral-eventos.com.br/storage/images/eventos/",
    }
  },
  created() {
    this.arumaData();
    this.arumaHora();

  },
  methods:{
    arumaHora() {
      let hi = this.evento.hora_inicio.split(":");
      let ht = this.evento.hora_termino.split(":");
      this.hora_inicio = `${hi[0]}:${hi[1]}`;
      this.hora_termino = `${ht[0]}:${ht[1]}`;

    },
    arumaData() {
      let di = this.evento.data_inicio.split("-");
      let dt = this.evento.data_termino.split("-");
      this.data_inicio = `${di[2]}/${di[1]}/${di[0]}`;
      this.data_termino = `${dt[2]}/${dt[1]}/${dt[0]}`;

    },
    infoEvento(){
      router.push({path: `/eventos/${this.evento.evento_id}`});
    }
  }
};
</script>

<style scoped>
.card-evento{
  margin-top: 10px;
  display: block;
}

.card {
  width: 400px;
}
.card-evento:hover{
  box-shadow: #18c07a 1px 7px 29px 1px;
  cursor: pointer;
}

.card-title{
  text-align: center;
  color: #18c07a;
  font-size: 1.5rem;
  font-weight: bold;
}
.card-text{
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
}

img{
  width: 399px;
  height: 200px;
}
</style>