<template>
  <div class="container text-center">
    <div class="row justify-content-start">
      <div class="col-4">
        <img :src="url + evento.imagem_evento" class="img-fluid"  :alt="evento.titulo_evento" />
      </div>
      <div class="col">
        <h2>{{ evento.titulo_evento }}</h2>
        <div class="data">
          <i class="fa-solid fa-calendar-days"></i>
          <label> Inicio: {{ data_inicio }} {{ hora_inicio }}</label> <label> Termino: {{ data_termino }} {{ hora_termino }}</label>
        </div>
        <div class="endereco">
          <i class="fa-solid fa-location-dot"></i>
          <label
            >{{ evento.numero }}, {{ evento.logradouro }}, {{ evento.bairro }},
            {{ evento.cidade }}, {{ evento.cep }}</label
          >
        </div>
        <div class="row">
          <div class="col">
            <div class="visualizacao">
              <label>Vizualizaçoes: {{ evento.view }}</label>
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
            <button class="btv" title="visualizar" @click="visualizar()">
              <i class="fa-solid fa-eye"></i>
            </button>
            <button class="bti" title="Ingressos" @click="vendaIngresso()">
              <i class="fa-solid fa-ticket"></i>
            </button>
            <button class="bte" title="Editar" @click="editarEvento()">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              class="btx"
              title="Deletar"
              @click="deleteEvento(evento.evento_id)"
            >
              <i class="fa-solid fa-trash"></i>
            </button>
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
      url: "https://api.litoral-eventos.com.br/storage/images/eventos/",
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
    deleteEvento(id) {
      this.$emit("delete-evento", id);
    },

    visualizar() {
      router.push({ path: `/eventos/${this.evento.evento_id}` });
    },
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
    editarEvento() {
      router.push({
        path: `/deshboard/criador/${this.criador.name}/editar-evento/${this.evento.evento_id}`,
      });
    },
    vendaIngresso() {
      router.push({
        path: `/deshboard/criador/${this.criador.name}/venda-ingresso/${this.evento.evento_id}`,
      });
    },
  },
};
</script>

<style scoped>
.container {
  padding-bottom: 15px;
  margin-bottom: 30px;
}

h2 {
  color: #18c07a;
}
i {
  margin: 0;
  padding: 0;
}
.data label {
  font-weight: bold;
  font-size: 1.3rem;
}
.endereco label {
  font-size: 1.2rem;
}

img {
  height: 200px;
  width: 100%;
}
.visualizacao {
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #b9c128;
}

button {
  color: #000000;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
  margin-left: 15px;
  border: none;
  padding: 5px 10px 5px 10px;
}
button:hover {
  font-size: 1.2rem;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
.btv {
  background-color: #00fe94;
}
.bte {
  background-color: #624cce;
}
.bti {
  background-color: #e5bae9;
}
.btx {
  background-color: #fe0000;
}
.box-end {
  padding-top: 10px;
}

@media (max-width: 600px) {
  h2 {
    color: #18c07a;
    font-size: 1.5rem;
  }
  .data label {
    font-weight: bold;
    font-size: 1rem;
  }
  .endereco label {
    font-size: 1rem;
  }

  img {
    height: 200px;
    width: 300px;
  }
  .visualizacao {
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    color: #b9c128;
  }
  .col-4{
    display: none;
  }
  button {
    color: #000000;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    margin-left: 5px;
    border: none;
    padding: 5px, 10px, 5px, 10px;
  }
  button:hover {
    font-size: 1.2rem;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }
}

@media (max-width: 450px) {
  h2 {
    color: #18c07a;
  }
  .data label i {
    font-weight: bold;
    font-size: 0.7rem;
  }
  .endereco label i {
    font-size: 0.7rem;
  }
  .visualizacao {
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    color: #b9c128;
  }
  button:hover {
    font-size: 1.2rem;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }
}
</style>