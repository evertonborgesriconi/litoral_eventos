<template>
  <div class="home">
    <div class="container">
      <div class="box">
        <div class="row align-items-center">
          <div class="col">
            <img src="../assets/images/img1.png" class="img-fluid" alt="igm" />
          </div>
          <div class="col">
            <div class="divulga">
              <h2>Deseja criar seu proprio evento?</h2>
              <p>divulgue e promova seus eventos de forma rapida e facil !!</p>
              <div class="btn2">
                <router-link to="/register"
                  >Torna-se um criador agora!!</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box-search">
        <div class="row">
          <!-- <div class="col"><h2>Eventos perto de você !!</h2></div> -->
        </div>
        <div class="row">
          <div class="col">
            <div class="search-box">
              <input
                type="text"
                class="input-search"
                placeholder="pesquisar por eventos..."
                v-model="search"
              />
            </div>
            <div class="row align-items-center">
              <div class="col">
                <div class="ac">
                  <div>
                    <select
                      name="categoria"
                      v-on:change="filterLister()"
                      v-model="categoria"
                    >
                      <option disabled selected value="all">Categorias</option>
                      <option selected value="all">Todas</option>
                      <option
                        v-for="item in categorias"
                        :key="item.categoria_id"
                        :value="item.categoria_id"
                      >
                        {{ item.nome_categoria }}
                      </option>
                    </select>
                    <!-- <select
                      name="assunto"
                      v-on:change="filterLister()"
                      v-model="assunto"
                    >
                      <option disabled selected value="all">Assuntos</option>
                      <option
                        v-for="item in assuntos"
                        :key="item.assunto_id"
                        :value="item.assunto_id"
                      >
                        {{ item.nome_assunto }}
                      </option>
                    </select> -->
                  </div>

                  <button
                    class="btn2"
                    @click="filterEventoPerto()"
                    v-if="loadingButton"
                  >
                    Procurar eventos perto de min!!
                  </button>
                  <button class="btn2" @click="allEventos()" v-else>
                    Retornar todos os eventos!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box-event" v-if="loadingEventos">
        <CardApp
          v-for="evento in filteredList"
          :key="evento.evento_id"
          :evento="evento"
        />
        <h4 v-if="filteredList.length == 0">Nenhum evento encontrado!</h4>
      </div>
      <div v-else>
        <SpinnerApp />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { api } from "../../http/index";
import CardApp from "../components/CardApp.vue";
import SpinnerApp from "../components/SpinnerApp.vue";
//import axios from "axios";
export default {
  name: "HomeView",
  components: { CardApp, SpinnerApp },
  data() {
    return {
      assuntos: [],
      categorias: [],
      eventos: [],
      totalEventos: [],
      loadingEventos: false,
      search: "",
      posi: {},
      cidade: "",
      uf: "",
      assunto: "all",
      categoria: "all",
      userCord: null,
      loadingButton: true,
      loc: false,
    };
  },
  created() {
    this.getAssunto();
    this.getCategoria();
    this.getEventos();
  },

  computed: {
    filteredList() {
      return this.eventos.filter((evento) => {
        return evento.titulo_evento
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },

  methods: {
    allEventos() {
      this.loadingEventos = false;
      this.eventos = this.totalEventos;
      this.loadingButton = true;
      this.loadingEventos = true;
    },

    filterEventoPerto() {
      if (this.loc == false) {
        this.$swal({
          icon: "error",
          title: "Ops algo deu errado!!",
          text: `Para utilizar essa função você deve primeiro liberar sua localização para o site`,
        });
        return;
      } else {
        this.loadingEventos = false;
        this.eventos = [];

        this.totalEventos.forEach((evento) => {
          if (parseFloat(evento.distanceUser) < 80) {
            this.eventos.push(evento);
          }
        });
        this.loadingButton = false;

        this.loadingEventos = true;
      }
    },

    filterLister() {
      this.loadingEventos = false;
      this.eventos = [];
      if (this.categoria != "all") {
        //  console.log(this.categoria);
        this.totalEventos.forEach((evento) => {
          if (this.categoria == evento.categoria_id) {
            this.eventos.push(evento);
          }
        });
      } else {
        this.eventos = this.totalEventos;
      }
      this.loadingEventos = true;
    },

    getLocation() {
      this.loadingEventos = false;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.showPosition,
          this.showError
        );
      } else {
        this.$swal({
          icon: "error",
          title: "Ops algo deu errado!!",
          text: `Geolocation is not supported by this browser.`,
        });
      }
      this.loadingEventos = true;
    },

    orderByData(eventos) {
      const hoje = new Date();
      const dia = hoje.getDate().toString().padStart(2, "0");
      const mes = String(hoje.getMonth() + 1).padStart(2, "0");
      const ano = hoje.getFullYear();
      const dataAtual = `${ano}-${mes}-${dia}`;
      this.eventos = eventos.filter((result) => {
        return this.converteData(result.data_termino) > this.converteData(dataAtual);
      });
      this.totalEventos = eventos.filter((result) => {
        return this.converteData(result.data_termino) > this.converteData(dataAtual);
      });


      this.eventos.reverse();
      this.totalEventos.reverse();


    },

    converteData(DataDDMMYY) {
      const dataSplit = DataDDMMYY.split("-");
      const novaData = new Date(
        parseInt(dataSplit[0], 10),
        parseInt(dataSplit[1], 10) - 1,
        parseInt(dataSplit[2], 10)
      );
      return novaData;
    },

    distanceEvento(cord, eventos) {
      eventos.forEach((evento) => {
        var p1 = Math.cos((90 - cord.lat) * (Math.PI / 180));
        // Inicio dos calculos 2° parte
        var p2 = Math.cos((90 - evento.lat) * (Math.PI / 180));
        // Inicio dos calculos 3° parte
        var p3 = Math.sin((90 - cord.lat) * (Math.PI / 180));
        // Inicio dos calculos 4° parte
        var p4 = Math.sin((90 - evento.lat) * (Math.PI / 180));
        // Inicio dos calculos 5° parte
        var p5 = Math.cos((cord.lng - evento.lng) * (Math.PI / 180));
        var km = Math.acos(p1 * p2 + p3 * p4 * p5) * 6371 * 1.15;
        evento.distanceUser = km.toFixed(1).replace(".", ",");
      });
    },

    showPosition(position) {
      const cord = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.distanceEvento(cord, this.eventos);
      this.distanceEvento(cord, this.totalEventos);

      this.loc = true;
    },

    showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          this.$swal({
            icon: "error",
            title: "Ops algo deu errado!!",
            text: `Para melhorar sua experiencia por favor recarregue o site e aceite compartilhar sua localização !`,
          });
          break;
        case error.POSITION_UNAVAILABLE:
          this.$swal({
            icon: "error",
            title: "Ops algo deu errado!!",
            text: `Location information is unavailable.`,
          });
          break;
        case error.TIMEOUT:
          this.$swal({
            icon: "error",
            title: "Ops algo deu errado!!",
            text: `The request to get user location timed out.`,
          });
          break;
        case error.UNKNOWN_ERROR:
          this.$swal({
            icon: "error",
            title: "Ops algo deu errado!!",
            text: `An unknown error occurred.`,
          });
          break;
      }
    },

    getEventos() {
      this.loadingEventos = false;
      api
        .get("eventos")
        .then((response) => {
          this.AllEventos = response.data;
          this.getLocation();
          this.orderByData(response.data);
          this.loadingEventos = true;
        })
        .catch((error) => {
          console.log(error.request.response);
        });
    },
    getAssunto() {
      api
        .get("assuntos")
        .then((response) => {
          this.assuntos = response.data;
        })
        .catch((error) => {
          console.log(error.request.response);
        });
    },
    getCategoria() {
      api
        .get("categorias")
        .then((response) => {
          this.categorias = response.data;
          //console.log(this.categorias);
        })
        .catch((error) => {
          console.log(error.request.response);
        });
    },
  },
};
</script>

<style scoped>
.container {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 0;
}
.box {
  background-color: #18c07a;
}

.divulga {
  padding-right: 1rem;
}
.divulga h2 {
  font-size: 2.8rem;
  color: #ffffff;
  font-weight: bold;
}

.divulga p {
  margin-top: 1.5rem;
  font-size: 1.5rem;
  color: #ffffff;
  font-weight: bold;
}

.btn2 {
  padding: 3px 5px 3px 5px;
  background-color: #ffffff;
  border-radius: 50px 50px 50px 50px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  color: #18c07a;
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;
}

.btn2 a {
  text-decoration: none;
  font-size: 2rem;
  font-weight: bold;
  color: rgb(24, 192, 122);
}

.btn2 a:hover {
  font-size: 2.1rem;
}

.box-search {
  margin-top: 30px;
  margin-left: 5px;
  margin-right: 5px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  border-radius: 15px;
  background-color: #18c07a;
}

.box-search h2 {
  font-size: 2.8rem;
  color: #ffffff;
  font-weight: bold;
  padding-left: 5px;
}
.search-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
button {
  margin-top: 10px;
  outline: none;
  background-color: transparent;
  border-radius: 5px;
  font-size: 3.5rem;
  padding-left: 10px;
  padding-right: 10px;
  color: #fff;
  border: 1px solid #fff;
}

.box-search .input-search {
  width: 100%;
  border-style: none;
  padding-left: 10px;
  padding-bottom: 2px solid #fff;
  font-size: 2rem;
  outline: none;
  border-bottom: 1px solid #fff;
  color: #fff;
  background-color: #18c07a;
  margin-bottom: 5px;
}

.box-search .input-search::placeholder {
  color: #fff;
  font-weight: lighter;
}

.box-search select {
  padding: 3px 5px 3px 5px;
  background-color: #ffffff;
  border-radius: 50px 50px 50px 50px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  color: #18c07a;
  font-size: 1.6rem;
  text-align: center;
  border: none;
  margin-right: 10px;
  font-weight: bold;
  margin-top: 20px;
}

.ac {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.box-event {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-left: 10px;
  padding-right: 10px;
}

h4 {
  padding-top: 30px;
  font-size: 2rem;
  color: rgb(170, 169, 169);
}

@media (max-width: 1000px) {
  .divulga h2 {
    font-size: 1.8rem;
    color: #ffffff;
    font-weight: bold;
  }

  .divulga p {
    margin-top: 1rem;
    font-size: 1rem;
    color: #ffffff;
    font-weight: bold;
  }

  .box {
    padding-bottom: 5px;
  }

  .btn2 {
    padding: 3px 5px 3px 5px;
    color: #18c07a;
    font-size: 1.2rem;
  }
  .btn2 a {
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
    color: rgb(24, 192, 122);
  }
  .box-search .input-search {
    border-style: none;
    padding-left: 10px;
    font-size: 1.3rem;
    outline: none;
    border-bottom: 1px solid #fff;
    color: #fff;
    background-color: #18c07a;
    margin-bottom: 5px;
  }
  .box-search select {
    font-size: 1.5rem;
    text-align: center;
    border: none;
    margin-right: 10px;
    font-weight: bold;
    margin-top: 15px;
  }
}

@media (max-width: 770px) {
  .box-search .input-search {
    border-style: none;
    padding-left: 10px;
    font-size: 1rem;
    outline: none;
    border-bottom: 1px solid #fff;
    color: #fff;
    background-color: #18c07a;
    margin-bottom: 5px;
  }

  .divulga h2 {
    font-size: 1.4rem;
    color: #ffffff;
    font-weight: bold;
  }

  .divulga p {
    font-size: 0.9rem;
    color: #ffffff;
    font-weight: bold;
    margin-top: 2px;
  }
  .btn2 {
    padding: 3px 5px 3px 5px;
    color: #18c07a;
    font-size: 1rem;
  }
  .btn2 a {
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: bold;
    color: rgb(24, 192, 122);
  }
}

@media (max-width: 560px) {
  .container {
    width: 100%;
  }
  .btn2 {
    padding: 3px 5px 3px 5px;
    color: #18c07a;
    font-size: 0.7rem;
  }
  .btn2 a {
    text-decoration: none;
    font-size: 0.7rem;
    font-weight: bold;
    color: rgb(24, 192, 122);
  }

  .box-search select {
    font-size: 0.7rem;
    text-align: center;
    border: none;
    margin-right: 10px;
    font-weight: bold;
    margin-top: 15px;
  }
}
</style>