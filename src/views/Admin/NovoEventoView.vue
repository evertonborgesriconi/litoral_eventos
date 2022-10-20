<template>
  <section>
    <div class="container">
      <h1>Novo Evento</h1>
      <Form @submit="postEvento()">
        <div class="input-group mb-3">
          <label class="form-label">Titulo do Evento</label>
          <Field name="titulo" type="text" :rules="validateTitulo" />
          <ErrorMessage name="titulo" class="error" />
        </div>
        <div class="input-group mb-3">
          <div class="d-flex flex-column">
            <label class="form-label">Imagem de divulgação </label>
            <div class="row">
              <div class="col-6">
                <div
                  class="imagePreview"
                  :style="{ 'background-image': `url(${previewImage})` }"
                  @click="selectImage"
                ></div>
                <input
                  name="image"
                  type="file"
                  ref="fileInput"
                  @input="pickFile"
                />
              </div>
              <div class="col-6">
                <h3>
                  Formato JPEG ou PNG de no máximo 2MB. Imagens com dimensões
                  diferentes serão redimensionadas.
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="input-group mb-3">
              <label class="form-label">Assunto</label>

              <Field name="assunto" as="select" v-model="evento.assunto">
                <option disabled value="">Escolha um Assunto</option>
                <option
                  v-for="item in assuntos"
                  :key="item.id_assunto"
                  :value="item"
                  :rules="validateAssunto"
                >
                  {{ item.nome_assunto }}
                </option>
              </Field>
              <ErrorMessage name="assunto" class="error" />
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <label class="form-label">Categorias</label>
              <Field name="categoria" as="select" v-model="evento.categoria">
                <option disabled value="">Escolha uma Categoria</option>
                <option
                  v-for="item in categorias"
                  :key="item.id_cetegoria"
                  :value="item"
                  :rules="validateCategoria"
                >
                  {{ item.nome_categoria }}
                </option>
              </Field>
              <ErrorMessage name="categoria" class="error" />
            </div>
          </div>
        </div>
        <div class="column">
          <label class="form-label">Descrição do evento</label>
          <p>
            Conte todos os detalhes do seu evento, como a programação e os
            diferenciais da sua produção!
          </p>
          <Field
            as="textarea"
            name="descricao"
            :rules="validateDescricao"
            class="text-area"
          />
          <ErrorMessage name="descricao" class="error" />
        </div>
        <div class="column">
          <label class="form-label"> Data e horário </label>
          <p>Informe aos participantes quando seu evento vai acontecer!</p>
        </div>
        <div class="row">
          <div class="col">
            <label class="form-label"> Data de inicio </label>
            <Field name="data_inicio" type="date" :rules="validateDataInicio" />
            <ErrorMessage name="data_inicio" class="error" />
          </div>
          <div class="col">
            <label class="form-label"> Hora de inicio </label>
            <Field name="hora_inicio" type="time" :rules="validateHoraInicio" />
            <ErrorMessage name="hora_inicio" class="error" />
          </div>
          <div class="col">
            <label class="form-label"> Data de termino </label>
            <Field
              name="data_termino"
              type="date"
              :rules="validateDataTermino"
            />
            <ErrorMessage name="data_termino" class="error" />
          </div>
          <div class="col">
            <label class="form-label"> Hora de Termino </label>
            <Field
              name="hora_termino"
              type="time"
              :rules="validateHoratermino"
            />
            <ErrorMessage name="hora_termino" class="error" />
          </div>
        </div>
        <div class="row">
          <label class="form-label"> Busque o endereço do evento </label>
          <div class="col-6">
            <div class="search">
              <GMapAutocomplete
                placeholder="Escreva o endereço do evento"
                @place_changed="setPlace"
              >
              </GMapAutocomplete>
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                @click="addMarker()"
              >
                Buscar
              </button>
            </div>
            <div v-if="loadingMap" class="column">
              <div class="input-group mb-3">
                <label class="form-label">CEP</label>
                <Field
                  name="cep"
                  type="text"
                  :rules="validateCep"
                  v-model="evento.cep"
                />
                <ErrorMessage name="cep" class="error" />
              </div>
              <div class="input-group mb-3">
                <label class="form-label">UF</label>
                <Field
                  name="uf"
                  type="text"
                  :rules="validateUf"
                  v-model="evento.uf"
                />
                <ErrorMessage name="uf" class="error" />
              </div>
              <div class="input-group mb-3">
                <label class="form-label">Cidade</label>
                <Field
                  name="cidade"
                  type="text"
                  :rules="validateCidade"
                  v-model="evento.cidade"
                />
                <ErrorMessage name="cidade" class="error" />
              </div>
              <div class="input-group mb-3">
                <label class="form-label">Bairro</label>
                <Field
                  name="bairro"
                  type="text"
                  :rules="validateBairro"
                  v-model="evento.bairro"
                />
                <ErrorMessage name="bairro" class="error" />
              </div>
              <div class="input-group mb-3">
                <label class="form-label">Av.Rua</label>
                <Field
                  name="logradouro"
                  type="text"
                  :rules="validateLogradouro"
                  v-model="evento.logradouro"
                />
                <ErrorMessage name="logradouro" class="error" />
              </div>
              <div class="input-group mb-3">
                <label class="form-label">Numero</label>
                <Field
                  name="numero"
                  type="text"
                  :rules="validateNumero"
                  v-model="evento.numero"
                />
                <ErrorMessage name="numero" class="error" />
              </div>
            </div>
          </div>
          <div class="col-6">
            <div v-if="loadingMap">
              <GMapMap
                :center="center"
                :zoom="4"
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
          </div>
        </div>
        <button class="btn" type="submit">Cadastrar novo evento</button>
      </Form>
    </div>
  </section>
</template>

<script>
import { adminApi } from "../../../http/index";
import { api } from "../../../http/index";
import { Form, Field, ErrorMessage } from "vee-validate";
import { notify } from "@kyvg/vue3-notification";
//import SpinnerApp from "../components/SpinnerApp.vue";

//import { notify } from "@kyvg/vue3-notification";
export default {
  name: "NovoEventoView",
  components: { Form, Field, ErrorMessage },
  data() {
    return {
      evento: {
        id_criador: null,
        titulo_evento: "",
        imagem_evento: '',
        categoria: null,
        assunto: null,
        decricao_evento: "",
        data_inicio: null,
        hora_inicio: null,
        data_termino: null,
        hora_termino: null,
        cep: "",
        logradouro: "",
        bairro: "",
        numero: "",
        cidade: "",
        uf: "",
        lat: null,
        lng: null,
      },
      previewImage: null,
      categorias: [],
      assuntos: [],

      currintPlace: null,
      places: [],
      markers: [],
      center: { lat: -29.5501089, lng: -49.8872992 },
      loadingMap: false,
      loading: false,
    };
  },

  computed: {
    criador() {
      return this.$store.state.criador;
    },
  },

  created() {
    this.getAssunto();
    this.getCategoria();
  },
  methods: {
    postEvento() {
      this.evento.id_criador = this.criador.id_criador;
      this.evento.categoria = this.evento.categoria.id_categoria;
      this.evento.assunto = this.evento.assunto.id_assunto;

      console.log(this.evento);
      adminApi
        .post("registerevento", this.evento)
        .then((response) => {
          console.log(response.data);
          if (response.status == 200 || response.status == 201) {
            notify({
              type: "success",
              text: "Evento cadastrado com sucesso",
            });
          }
        })
        .catch((error) => {
          //.loading = true;
          var msg = error.response.data.message;
          console.log(error);

          notify({
            type: "error",
            text: `${msg}`,
          });
        });
    },

    addMarker() {
      this.loadingMap = false;

      this.markers = [];
      this.places = [];
      this.center = {};

      if (this.currintPlace) {
        const marker = {
          lat: this.currintPlace.geometry.location.lat(),
          lng: this.currintPlace.geometry.location.lng(),
        };

        this.evento.lat = this.currintPlace.geometry.location.lat();
        this.evento.lng = this.currintPlace.geometry.location.lng();

        var endereco = this.currintPlace.address_components;

        for (let i = 0; i < endereco.length; i++) {
          let tipo = "";
          tipo = endereco[i].types[0];

          if (tipo == "street_number") {
            this.evento.numero = endereco[i].long_name;
          }
          if (tipo == "route") {
            this.evento.logradouro = endereco[i].long_name;
          }
          if (tipo == "sublocality_level_1") {
            this.evento.bairro = endereco[i].long_name;
          }
          if (tipo == "administrative_area_level_2") {
            this.evento.cidade = endereco[i].long_name;
          }
          if (tipo == "administrative_area_level_1") {
            this.evento.uf = endereco[i].long_name;
          }
          if (tipo == "postal_code") {
            this.evento.cep = endereco[i].long_name;
          }
        }

        this.markers.push({ position: marker });
        this.places.push(this.currintPlace);
        this.center = marker;

        this.loadingMap = true;
      }
    },

    setPlace(place) {
      this.currintPlace = null;
      this.currintPlace = place;
    },
    getAssunto() {
      api
        .get("assuntos")
        .then((response) => {
          //console.log(response.data);
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
          //console.log(response.data);
        })
        .catch((error) => {
          console.log(error.request.response);
        });
    },

    validateCep(value) {
      if (!value) {
        return "O campo CEP esta vazio";
      }
      this.evento.cep = value;
      return true;
    },

    validateUf(value) {
      if (!value) {
        return "O campo UF esta vazio";
      }
      this.evento.uf = value;
      return true;
    },

    validateBairro(value) {
      if (!value) {
        return "O campo Bairro esta vazio";
      }
      this.evento.bairro = value;
      return true;
    },

    validateCidade(value) {
      if (!value) {
        return "O campo Cidade esta vazio";
      }
      this.evento.cidade = value;
      return true;
    },

    validateLogradouro(value) {
      if (!value) {
        return "O campo logradouro esta vazio";
      }
      this.evento.logradouro = value;
      return true;
    },

    validateNumero(value) {
      if (!value) {
        return "O campo numero esta vazio";
      }
      this.evento.numero = value;
      return true;
    },

    validateHoraInicio(value) {
      if (!value) {
        return "O campo hora inicio esta vazio";
      }
      this.evento.hora_inicio = value;
      return true;
    },
    validateDataInicio(value) {
      if (!value) {
        return "O campo data inicio esta vazio";
      }
      this.evento.data_inicio = value;
      return true;
    },
    validateDataTermino(value) {
      if (!value) {
        return "O campo data termino esta vazio";
      }
      this.evento.data_termino = value;
      return true;
    },
    validateHoratermino(value) {
      if (!value) {
        return "O campo hora termino esta vazio";
      }
      this.evento.hora_termino = value;
      return true;
    },
    validateDescricao(value) {
      if (!value) {
        return "O campo descrição esta vazio";
      }
      this.evento.decricao_evento = value;
      return true;
    },

    validateCategoria(value) {
      if (!value) {
        return "Selecione uma Categoria";
      }

      console.log(value);

      return true;
    },
    validateAssunto(value) {
      if (!value) {
        return "Selecione uma Assunto";
      }
      console.log(value);
      return true;
    },

    validateTitulo(value) {
      if (!value) {
        return "O campo titulo esta vazio";
      }

      if (value.length < 6) {
        return "O campo titulo tem que ter no minimo 6 caracters";
      }

      this.evento.titulo_evento = value;
      return true;
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        //let formData = new FormData();
       // formData.set("image", file[0]);
        //this.evento.imagem_evento = formData;
       // console.log(this.imagem);
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
          this.evento.imagem_evento = e.target.result;
          console.log(this.evento.imagem_evento);
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);

      }
    },
  },
};
</script>

<style scoped>
section {
  margin-top: 30px;
}

section h1 {
  font-size: 3.5rem;
  text-align: center;
  color: #18c07a;
  font-weight: bold;
}
section input {
  background-color: #f8f8fb;
  display: block;
  width: 100%;
  padding: 0.2rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.3rem;
  border: 2px solid #18c07a;
  color: #18c07a;
}
section select {
  background-color: #f8f8fb;
  display: block;
  width: 100%;
  padding: 0.2rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  border: none;
  line-height: 1.5;
  border-radius: 0.3rem;
  border: 2px solid #18c07a;
  color: #18c07a;
}

section .row {
  margin-top: 15px;
}

section label {
  font-weight: bold;
  color: black;
  font-size: 1.5rem;
}

section p {
  font-size: 1.1rem;
}

.imagePreview {
  height: 200px;
  width: 400px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
  background-color: #18c07a;
}

.text-area {
  height: 300px;
  width: 100%;
  line-height: 1.5;
  font-size: 1.5rem;
  border-radius: 0.3rem;
  border: 2px solid #18c07a;
  color: #18c07a;
}

.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn {
  background-color: #18c07a;
  color: #ffffff;
  border-radius: 5%;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

.error {
  color: red;
}
</style>