<template>
  <section>
    <div class="container" v-if="!loading">
      <div class="box-img">
        <img
          :src="url + evento.imagem_evento"
          class="img-fluid"
          :alt="evento.titulo_evento"
        />
      </div>

      <div class="titulo">
        <h1>{{ evento.titulo_evento }}</h1>
      </div>
      <div class="data">
        <div class="row">
          <div class="col">
            <i class="fa-solid fa-calendar-days"></i> Data Inicio:
            {{ data_inicio }} {{ hora_inicio }}
          </div>
          <div class="col">
            <i class="fa-solid fa-calendar-days"></i> Data Termino:
            {{ data_termino }} {{ hora_termino }}
          </div>
        </div>
      </div>
      <hr />
      <div class="descricao">
        <div class="row">
          <div class="col">
            <h2>Descrição do Evento</h2>
          </div>
        </div>
        <p>{{ evento.decricao_evento }}</p>
      </div>
      <hr />
      <div class="endereco">
        <div class="row">
          <div class="col">
            <h2>Local do Evento</h2>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="ende">
              <label>
                {{ evento.numero }}, {{ evento.logradouro }},
                {{ evento.bairro }}, {{ evento.cidade }}, {{ evento.uf }}</label
              >
            </div>
          </div>
        </div>
        <div class="map">
          <GMapMap
            :center="center"
            :zoom="15"
            map-type-id="terrain"
            ref="myMapRef"
            style="width: 100%; height: 500px"
          >
            <GMapMarker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
            />
          </GMapMap>
        </div>
        <hr />
        <div class="ingresso" v-if="locaisIngresso.length != 0">
          <h2>Locais de venda de ingresso</h2>
          <div class="ingresso-box">
            <CardLocalApp
              v-for="local in locaisIngresso"
              :key="local.local_id"
              :local="local"
              :tipe="false"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <spinnerApp />
    </div>
  </section>
</template>

<script>
import { api } from "../../http/index";
import SpinnerApp from "../components/SpinnerApp.vue";
import CardLocalApp from "../components/CardLocalApp.vue";
export default {
  name: "PageInfoEventoView",
  components: { SpinnerApp, CardLocalApp },
  data() {
    return {
      evento_id: this.$route.params.id,
      evento: {},
      locaisIngresso: [],
      center: {
        lat: null,
        lng: null,
      },
      markers: [],
      loading: false,
      url: "https://api.litoral-eventos.com.br/storage/images/eventos/",
      data_inicio: "",
      hora_inicio: "",
      data_termino: "",
      hora_termino: "",
    };
  },
  created() {
    this.getEvento();
  },
  methods: {
    addView(evento_id) {
      let data = { evento_id: evento_id };
      api
        .post("/viewevento", data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.request.response);
        });
    },

    getEvento() {
      this.loading = true;
      api
        .get(`/evento/${this.evento_id}`)
        .then((response) => {
          this.evento = response.data;
          console.log(this.evento);
          this.center.lat = this.evento.lat;
          this.center.lng = this.evento.lng;

          const marker = {
            lat: this.evento.lat,
            lng: this.evento.lng,
          };
          this.markers.push({ position: marker });

          this.arumaData();
          this.arumaHora();

          this.getlocal();
          this.addView(this.evento.evento_id);

          this.loading = false;
        })
        .catch((error) => {
          console.log(error.request.response);
        });
    },
    getlocal() {
      api
        .get(`/getlocal/${this.evento_id}`)
        .then((response) => {
          this.locaisIngresso = response.data;
          console.log(this.locaisIngresso);
        })
        .catch((error) => {
          console.log(error.request.response);
        });
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
      this.data_termino = `${dt[2]}/${dt[1]}/${dt[0]}`;
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 1rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding-bottom: 30px;
  padding-top: 10px;
}
h1 {
  font-size: 3rem;
  text-align: center;
  color: #18c07a;
  font-weight: bold;
}

.box-img {
  box-shadow: #76d6d6 0px 1px 10px 1px;
}
.box-img img {
  height: 500px;
  width: 100%;
}
.titulo {
  margin-top: 30px;
}

.descricao {
  margin-top: 30px;
  font-size: 1.2rem;
  padding-right: 2px;
  padding-left: 2px;
}

.descricao h2 {
  font-size: 2.5rem;
  color: #18c07a;
  font-weight: bold;
}

.data {
  font-size: 1.5rem;
  text-align: center;
  padding-right: 2px;
  padding-left: 2px;
  font-weight: bold;
}

.endereco h2 {
  font-size: 2.5rem;
  color: #18c07a;
  font-weight: bold;
}

.endereco .ende {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  color: black;
}
</style>