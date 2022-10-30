<template>
  <section>
    <div v-if="!loading" class="container">
      <h1>Editar Evento</h1>
      <Form @submit="editaEvento()">
        <div class="input-group mb-3">
          <label>Titulo do Evento</label>
          <Field
            name="titulo"
            type="text"
            :rules="validateTitulo"
            v-model="evento.titulo_evento"
          />
          <ErrorMessage name="titulo" class="error" />
        </div>
        <div class="input-group mb-3">
          <div class="d-flex flex-column">
            <label>Imagem de divulgação </label>
            <p>Selecione uma imagem de capa de divulgação do seu evento!!</p>
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
              <label>Assunto</label>
              <p>Escolha um assunto que esta relacionado com o seu evento!</p>

              <Field name="assunto" as="select" v-model="evento.assunto_id">
                <option disabled value="">Escolha um Assunto</option>
                <option
                  v-for="item in assuntos"
                  :key="item.assunto_id"
                  :value="item.assunto_id"
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
              <label>Categorias</label>
              <p>
                Escolha uma categoria que esta relacionado com o seu evento!
              </p>
              <Field name="categoria" as="select" v-model="evento.categoria_id">
                <option
                  v-for="item in categorias"
                  :key="item.categoria_id"
                  :value="item.categoria_id"
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
          <label>Descrição do evento</label>
          <p>
            Conte todos os detalhes do seu evento, como a programação e os
            diferenciais da sua produção!
          </p>
          <Field
            as="textarea"
            name="descricao"
            :rules="validateDescricao"
            class="text-area"
            v-model="evento.decricao_evento"
          />
          <ErrorMessage name="descricao" class="error" />
        </div>
        <div class="column">
          <label> Data e horário </label>
          <p>Informe aos participantes quando seu evento vai acontecer!</p>
        </div>
        <div class="row">
          <div class="col">
            <label> Data de inicio </label>
            <Field
              name="data_inicio"
              type="date"
              :rules="validateDataInicio"
              v-model="evento.data_inicio"
            />
            <ErrorMessage name="data_inicio" class="error" />
          </div>
          <div class="col">
            <label> Hora de inicio </label>
            <Field
              name="hora_inicio"
              type="time"
              :rules="validateHoraInicio"
              v-model="evento.hora_inicio"
            />
            <ErrorMessage name="hora_inicio" class="error" />
          </div>
          <div class="col">
            <label> Data de termino </label>
            <Field
              name="data_termino"
              type="date"
              :rules="validateDataTermino"
              v-model="evento.data_termino"
            />
            <ErrorMessage name="data_termino" class="error" />
          </div>
          <div class="col">
            <label> Hora de Termino </label>
            <Field
              name="hora_termino"
              type="time"
              :rules="validateHoratermino"
              v-model="evento.hora_termino"
            />
            <ErrorMessage name="hora_termino" class="error" />
          </div>
        </div>
        <div class="row">
          <label> Busque o endereço do evento </label>
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
            <div class="column">
              <div class="row">
                <div class="col">
                  <div class="input-group mb-3">
                    <label>CEP</label>
                    <Field
                      name="cep"
                      type="text"
                      :rules="validateCep"
                      v-model="evento.cep"
                    />
                    <ErrorMessage name="cep" class="error" />
                  </div>
                </div>
                <div class="col">
                  <div class="input-group mb-3">
                    <label>UF</label>
                    <Field
                      name="uf"
                      type="text"
                      :rules="validateUf"
                      v-model="evento.uf"
                    />
                    <ErrorMessage name="uf" class="error" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="input-group mb-3">
                    <label>Cidade</label>
                    <Field
                      name="cidade"
                      type="text"
                      :rules="validateCidade"
                      v-model="evento.cidade"
                    />
                    <ErrorMessage name="cidade" class="error" />
                  </div>
                </div>
                <div class="col">
                  <div class="input-group mb-3">
                    <label>Bairro</label>
                    <Field
                      name="bairro"
                      type="text"
                      :rules="validateBairro"
                      v-model="evento.bairro"
                    />
                    <ErrorMessage name="bairro" class="error" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-8">
                  <div class="input-group mb-3">
                    <label>Av.Rua</label>
                    <Field
                      name="logradouro"
                      type="text"
                      :rules="validateLogradouro"
                      v-model="evento.logradouro"
                    />
                    <ErrorMessage name="logradouro" class="error" />
                  </div>
                </div>
                <div class="col-4">
                  <div class="input-group mb-3">
                    <label>Numero</label>
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
            </div>
          </div>
          <div class="col-6">
            <GMapMap
              :center="center"
              :zoom="4"
              map-type-id="terrain"
              ref="myMapRef"
              style="width: 100%; height: 420px"
            >
              <GMapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
              />
            </GMapMap>
          </div>
        </div>
        <div class="row">
          <div class="col" v-if="!loadingEdit">
            <button class="btn" type="submit">Editar Evento</button>
          </div>
          <div class="col" v-else>
            <SpinnerApp />
          </div>
        </div>
      </Form>
    </div>
    <div v-else>
      <div class="row">
        <div class="col"></div>
        <div class="col"><SpinnerApp /></div>
        <div class="col"></div>
      </div>
    </div>
  </section>
</template>

<script>
import router from "@/router";
import { adminApi } from "../../../http/index";
import SpinnerApp from "../../components/SpinnerApp.vue";
import { api } from "../../../http/index";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  name: "EditarEventoView",
  components: { SpinnerApp, Form, Field, ErrorMessage },

  data() {
    return {
      evento_id: this.$route.params.id,
      evento: {},
      loading: false,
      loadingEdit: false,
      assuntos: [],
      categorias: [],
      center: {
        lat: "",
        lng: "",
      },
      previewImage: null,
      markers: [],
      currintPlace: [],

    };
  },
  created() {
    this.getEvento();
    this.getAssunto();
    this.getCategoria();
  },

  computed: {
    criador() {
      return this.$store.state.criador;
    },
  },
  methods: {
    editaEvento() {
      this.loadingEdit = true;
      adminApi
        .put(`editarevento/${this.evento.evento_id}`, this.evento)
        .then((response) => {
          console.log(response.data);
          if (response.status == 200 || response.status == 201) {
            this.loadingEdit = false;

            this.$swal({
              icon: "success",
              title: "Tudo Certo!!",
              text: "Evento editado com sucesso!",
            });

            router.push({ path: `/deshboard/criador/:${this.criador.name}` });
          }
        })
        .catch((error) => {
          var msg = error.response.data.message;
            this.$swal({
              icon: "error",
              title: "Ops algo deu errado!!",
              text: `${msg}`,
            });
           
          this.loadingEdit = false;
        });
    },

    getEvento() {
      this.loading = true;
      const criador_id = sessionStorage.getItem("criador_id");

      if (criador_id) {
        adminApi
          .get(`/eventosbyid/${this.evento_id}/${criador_id}`)
          .then((response) => {
            this.evento = response.data;
            //console.log(this.evento);
            this.center.lat = this.evento.lat;
            this.center.lng = this.evento.lng;

            const marker = {
              lat: this.evento.lat,
              lng: this.evento.lng,
            };
            this.markers.push({ position: marker });

            this.previewImage = `https://api.litoral-eventos.com.br/storage/images/eventos/${this.evento.imagem_evento}`;

            this.loading = false;
          })
          .catch((error) => {
            console.log(error.request.response);
          });
      } else {
        this.loading = false;
        router.push({ path: "/login" });
      }
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

        this.evento.numero = "";
        this.evento.logradouro = "";
        this.evento.bairro = "";
        this.evento.cidade = "";
        this.evento.uf = "";
        this.evento.cep = "";

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

    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      this.previewImage = null;
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
          this.evento.imagem_evento = e.target.result;
          //console.log(this.evento.imagem_evento);
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
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

      return true;
    },
    validateAssunto(value) {
      if (!value) {
        return "Selecione uma Assunto";
      }

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
  },
};
</script>

<style scoped>
.container {
  margin-top: 1rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding-bottom: 30px;
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
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.5;
  border: none;
  appearance: none;
  border: 2px solid #18c07a;
  color: #18c07a;
}
section select {
  background-color: #f8f8fb;
  display: block;
  width: 100%;
  padding: 0.2rem 0.75rem;
  font-size: 1.5rem;
  font-weight: 400;
  border: none;
  line-height: 1.5;
  border: 2px solid #18c07a;
  color: #18c07a;
}

section .row {
  margin-top: 15px;
}

section label {
  font-weight: bold;
  color: black;
  font-size: 2rem;
}

section .ttl {
  font-size: 1.1rem;
}

section p {
  font-size: 1.3rem;
}

.imagePreview {
  height: 250px;
  width: 100%;
  display: block;
  cursor: pointer;
  margin-bottom: 1rem;
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
  border-radius: 5px;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-left: 5px;
}

.error {
  color: red;
}
</style>