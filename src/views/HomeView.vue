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

                  <button class="btn2" @click="getLocation()">
                    Procurar eventos na minha região
                  </button>
                  <button class="btn2" @click="teste()">teste</button>
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
        <h4 v-if="filteredList.length == 0">
          Atualmente não a eventos perto de você
        </h4>
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
import axios from "axios";
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
    teste() {
      this.totalEventos.forEach((evento) => {
        var p1 = Math.cos((90 - -29.339044) * (Math.PI / 180));
        // Inicio dos calculos 2° parte
        var p2 = Math.cos((90 - evento.lat) * (Math.PI / 180));
        // Inicio dos calculos 3° parte
        var p3 = Math.sin((90 - -29.339044) * (Math.PI / 180));
        // Inicio dos calculos 4° parte
        var p4 = Math.sin((90 - evento.lat) * (Math.PI / 180));
        // Inicio dos calculos 5° parte
        var p5 = Math.cos((-49.726735 - evento.lng) * (Math.PI / 180));

        var KM = Math.acos(p1 * p2 + p3 * p4 * p5) * 6371 * 1.15;

        if (KM < 100) {
          console.log(evento);
        }
      });
    },

    filterLister() {
      this.eventos = [];
      if (this.categoria != "all") {
        console.log(this.categoria);
        this.totalEventos.forEach((evento) => {
          if (this.categoria == evento.categoria_id) {
            this.eventos.push(evento);
          }
        });
      }
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
        this.loadingEventos = true;
      }
    },

    getEventosByLocalization() {
      this.loadingEventos = false;
      api
        .get(`eventos/${this.uf}/${this.cidade}`)
        .then((response) => {
          console.log(response.data);
          if (!response.data == []) {
            this.eventos = response.data;
          } else {
            this.$swal({
              icon: "error",
              title: "Ops parece que não a eventos no momento na sua cidade!!",
            });
            this.getEventos();
          }

          this.loadingEventos = true;
        })
        .catch((error) => {
          console.log(error.request.response);
        });
    },

    showPosition(position) {
      console.log(position);
      axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            position.coords.latitude +
            "," +
            position.coords.longitude +
            "&key=AIzaSyAb3CYZqmTuvQSWBiUSnK-ebRHU_9U1mio"
        )
        .then((response) => {
          if (response.status == 200 || response.status == 201) {
            let result = response.data.results[0];
            let endereco = result.address_components;
            console.log(endereco);
            for (let i = 0; i < endereco.length; i++) {
              if (endereco[i].types[0] == "administrative_area_level_1") {
                this.uf = endereco[i].long_name;
              }
              if (endereco[i].types[0] == "administrative_area_level_2") {
                this.cidade = endereco[i].long_name;
              }
            }
            this.getEventosByLocalization();
          }
        })
        .catch((error) => {
          console.log(error);
          this.$swal({
            icon: "error",
            title: "Ops algo deu errado!!",
            text: `${error}`,
          });
        });
    },

    showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          this.$swal({
            icon: "error",
            title: "Ops algo deu errado!!",
            text: `User denied the request for Geolocation.`,
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
          this.eventos = response.data;
          this.totalEventos = response.data;
          console.log(this.eventos);
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
</style>