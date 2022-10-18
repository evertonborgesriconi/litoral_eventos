<template>
  <section>
    <div class="container">
      <h1>Novo Evento</h1>
      <Form>
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

              <Field name="assunto" as="select">
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
              <Field name="categoria" as="select">
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
      </Form>
    </div>
  </section>
</template>

<script>
//import { adminApi } from "../../http/index";
import { api } from "../../../http/index";
import { Form, Field, ErrorMessage } from "vee-validate";
//import { notify } from "@kyvg/vue3-notification";
export default {
  name: "NovoEventoView",
  components: { Form, Field, ErrorMessage },
  data() {
    return {
      evento: {
        titulo: "",
        imagem: null,
        categoria: null,
        assunto: null,
      },
      previewImage: null,
      categorias: [],
      assuntos: [],
    };
  },
  created() {
    this.getAssunto();
    this.getCategoria();
  },
  methods: {
    getAssunto() {
      api
        .get("assuntos")
        .then((response) => {
          console.log(response.data);
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
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.request.response);
        });
    },
    validateDescricao(value) {
      if (!value) {
        return "O campo descrição esta vazio";
      }

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

      this.evento.titulo = value;
      return true;
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;

      if (file && file[0]) {
        let formData = new FormData();
        formData.append("image", file[0]);
        this.imagem = formData;
        console.log(this.imagem);
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);

        console.log(this.evento.categoria);
        console.log(this.evento.assunto);
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
  width: 600px;
  line-height: 1.5;
  border-radius: 0.3rem;
  border: 2px solid #18c07a;
  color: #18c07a;
}
</style>