<template>
  <div class="container text-center">
    <div class="row justify-content-start">
      <div class="col-4">
        <img :src="url + evento.imagem_evento" class="img-fluid" alt="" />
      </div>
      <div class="col-8">
        <h2>{{ evento.titulo_evento }}</h2>
        <div class="data">
          <i class="fa-solid fa-calendar-days"></i> <label> Inicio: {{ data_inicio }}  {{ hora_inicio }}</label> <label> Termino: {{ data_termino }}  {{ hora_termino }}</label
          >
        </div>
        <div class="endereco">
            <i class="fa-solid fa-location-dot"></i> <label>{{evento.numero}}, {{evento.logradouro}}, {{evento.bairro}}, {{evento.cidade}}, {{evento.cep}}</label>
        </div>
        <div class="row">
          <div class="col">
            <div class="visualizacao">
                    <label>Vizualizaçoes: {{0}}</label>
                </div>
          </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="box-end"></div>
            </div>
        </div>
        <div class="row">
          <div class="col">
            <button class="btv">Visualizar</button>
            <button class="bte" @click="editarEvento()">Editar</button>
            <button class="bti">Venda Ingresso</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
export default {
  name: "EventoCardApp",
  props: ["evento", "criador"],
  data() {
    return {
      data_inicio: "",
      hora_inicio: "",
      data_termino: "",
      hora_termino: "",
      url:"http://127.0.0.1:8000/public/storage/images/eventos/"
    };
  },

  mounted() {
    //console.log(this.evento);
  },
  created() {
    this.arumaData();
    this.arumaData();
  },

  methods: {
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
      this.hora_termino = `${dt[2]}/${dt[1]}/${dt[0]}`;
      
    },
    editarEvento(){
      router.push({
        path: `/deshboard/criador/${this.criador.name}/editar-evento/${this.evento.evento_id}`,
      });
    }


  },
};
</script>

<style scoped>
.container {
  padding-bottom: 15px;
  margin-bottom: 30px;
}

img {
  width: 400px;
}

h2 {
  color: #18c07a;
}
.data label {
  font-weight: bold;
  font-size: 1.3rem;
}
.endereco label {
    font-size: 1.2rem;
}
.visualizacao{
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
}
button{

color: #000000;
border-radius: 5px;
font-size: 1.1rem;
font-weight: bold;
text-align: center;
margin-left: 15px;
border: none;
padding: 5px 10px 5px 10px;
}
button:hover{
  font-size: 1.2rem;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
.btv{
    background-color: #00fe94;
}
.bte{
    background-color: #624cce;
}
.bti{
    background-color: #e5bae9;
}
.box-end{
    padding-top: 10px;
}
</style>