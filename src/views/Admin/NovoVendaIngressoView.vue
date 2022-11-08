<template>
  <section>
    <div class="container">
      <div class="titulo">
        <h2>Local de Venda de Ingresso</h2>
      </div>
      <div class="descricao">
        <p>
          Aqui voce podera cadastrar os locais de venda de ingressos do seus
          Eventos!
        </p>
      </div>
      <div class="box-input">
        <Form @submit="postLocal()">
          <div class="input-group mb-3">
            <label>Local da venda do Ingresso</label>
            <Field name="local" type="text" :rules="validateLocal" />
            <ErrorMessage name="local" class="error" />
          </div>
          <div class="input-group mb-3">
            <label>Endereço do Local</label>
            <GMapAutocomplete
              name="endereco"
              placeholder="Escreva o endereço do local"
              @place_changed="setPlace"
              :rules="validateEndereco"
            >
            </GMapAutocomplete>
            <ErrorMessage name="endereco" class="error" />
          </div>
          <div class="button" v-if="loading">
            <button class="btn" type="submit">Adiconar</button>
          </div>
          <div v-else>
            <SpinnerApp />
          </div>
        </Form>
      </div>
    </div>
    <div class="container">
      <div class="titulo">
        <h2>Locais Cadastrados</h2>
      </div>
      <div class="cards" v-if="!loadingLocal">
        <CardLocalApp
          v-for="local in locaisIngresso"
          :key="local.local_id"
          :local="local"
          :tipe="true"
          @delele-local="deleteLocal"
        />
      </div>
      <div v-else></div>
    </div>
  </section>
</template>

<script>
import SpinnerApp from "../../components/SpinnerApp.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { api } from "../../../http/index";
import { adminApi } from "../../../http/index";
import CardLocalApp from "../../components/CardLocalApp.vue";
export default {
  name: "NovoVendaIngressoView",
  components: { Form, Field, ErrorMessage, CardLocalApp, SpinnerApp },
  data() {
    return {
      evento_id: this.$route.params.id,
      local: {
        nome_local: "",
        endereco: "",
        evento_id: "",
      },
      locaisIngresso: [],
      loading: true,
      loadingLocal: true,
    };
  },
  created() {
    this.getEvento();
  },
  methods: {
    deleteLocal(id) {
      this.$swal
        .fire({
          title: "Deseja mesmo exlcuir esse local",
          showCancelButton: true,
          confirmButtonText: "Sim desejo",
          denyButtonText: `Nao`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            adminApi
              .delete(`deletelocal/${id}`)
              .then((response) => {
                console.log(response.data);
                if (response.status == 200 || response.status == 201) {
                  this.$swal({
                    icon: "success",
                    title: "Tudo certo!!",
                    text: "Seu Local foi excluido com sucesso!",
                  });

                  this.getlocal();
                }
              })
              .catch((error) => {
                var msg = error.response.data.message;
                console.log(error);
                this.$swal({
                  icon: "error",
                  title: "Ops algo deu errado!!",
                  text: `${msg}`,
                });
                this.loading = true;
              });
          }
        });
    },
    postLocal() {
      this.loading = false;

      adminApi
        .post("registerlocalingresso", this.local)
        .then((response) => {
          console.log(response.data);
          if (response.status == 200 || response.status == 201) {
            this.$swal({
              icon: "success",
              title: "Tudo certo!!",
              text: " Local foi cadastrado com sucesso!",
            });

            this.local.nome_local = "";
            this.local.endereco = "";
            this.getlocal();

            this.loading = true;
          }
        })
        .catch((error) => {
          this.loadingPost = false;
          var msg = error.response.data.message;
          console.log(error);

          this.$swal({
            icon: "error",
            title: "Ops algo deu errado!!",
            text: `${msg}`,
          });
          this.loading = true;
        });
    },

    getlocal() {
      this.loadingLocal = true;
      adminApi
        .get(`/getlocal/${this.evento_id}`)
        .then((response) => {
          this.locaisIngresso = response.data;
          this.loadingLocal = false;
        })
        .catch((error) => {
          console.log(error.request.response);
          this.loadingLocal = false;
        });
    },

    getEvento() {
      api
        .get(`/evento/${this.evento_id}`)
        .then((response) => {
          let evento = response.data;
          this.local.evento_id = evento.evento_id;

          this.getlocal();
        })
        .catch((error) => {
          console.log(error.request.response);
        });
    },
    setPlace(place) {
      let currintPlace = null;
      currintPlace = place;
      this.local.endereco = currintPlace.formatted_address;
      console.log(currintPlace.formatted_address);
    },
    validateLocal(value) {
      if (!value) {
        return "O campo local esta vazio";
      }

      if (value.length < 4) {
        return "O campo titulo tem que ter no minimo 4 caracters";
      }

      this.local.nome_local = value;
      return true;
    },

    validateEndereco(value) {
      if (!value) {
        return "O campo local esta vazio";
      }

      if (value.length < 4) {
        return "O campo titulo tem que ter no minimo 4 caracters";
      }

      this.local.endereco = value;
      return true;
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding-top: 15px;
  padding-bottom: 20px;
}

.titulo h2 {
  font-size: 3rem;
  text-align: center;
  color: #18c07a;
  font-weight: bold;
}

.descricao {
  text-align: center;
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
section label {
  font-weight: bold;
  color: black;
  font-size: 1.8rem;
}

.button {
  display: flex;
  justify-content: right;
  padding-bottom: 20px;
}
.btn {
  background-color: #18c07a;
  color: #ffffff;
  border-radius: 5px;
  font-size: 1.5rem;
  text-align: center;
}

.error {
  color: red;
}
</style>