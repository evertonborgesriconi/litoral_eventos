<template>
  <section>
    <div class="container" v-if="!loading">
      <Form @submit="teste()">
        <h1>Editar dados criador</h1>
        <div class="input-group mb-3">
          <label class="form-label">Nome Completo</label>

          <Field
            name="name"
            type="text"
            :rules="validateName"
            v-model="criador.name"
          />
          <ErrorMessage name="name" class="error" />
        </div>
        <div class="input-group mb-3">
          <label class="form-label">CPF</label>

          <Field
            name="cpf_cnpj"
            type="text"
            :rules="validateCpf_cnpj"
            v-mask="'###.###.###-##'"
            v-model="criador.cpf_cnpj"
          />
          <ErrorMessage name="cpf_cnpj" class="error" />
        </div>

        <div class="input-group mb-3">
          <label class="form-label">Data Nascimento</label>

          <Field
            name="data_nascimento"
            type="date"
            :rules="validateData_nascimento"
            v-model="criador.data_nascimento"
          />
          <ErrorMessage name="data_nascimento" class="error" />
        </div>
        <div class="input-group mb-3">
          <label class="form-label">Telefone</label>

          <Field
            name="telefone"
            type="tel"
            :rules="validateTelefone"
            v-mask="'(##) #####-####'"
            v-model="criador.telefone"
          />
          <ErrorMessage name="telefone" class="error" />
        </div>
        <div class="input-group mb-3">
          <label class="form-label">Email</label>

          <Field
            name="email"
            type="email"
            :rules="validateEmail"
            v-model="criador.email"
          />
          <ErrorMessage name="email" class="error" />
        </div>
        <div class="input-group mb-3">
          <label class="form-label">Senha</label>
          <Field name="password" type="password" :rules="validatePassword" />
          <ErrorMessage name="password" class="error" />
        </div>
        <div class="input-group mb-3">
          <label class="form-label">Confirma Senha</label>
          <Field
            name="password_confirmation"
            type="password"
            :rules="validatePassword_confirmation"
          />
          <ErrorMessage name="password_confirmation" class="error" />
        </div>
        <button type="submit" class="btn" @click="novoEvento()">
          Editar dados
        </button>
      </Form>
    </div>
    <div v-else>
      <SpinnerApp />
    </div>
  </section>
</template>

<script>
import { adminApi } from "../../../http/index";
import { Form, Field, ErrorMessage } from "vee-validate";
import SpinnerApp from "../../components/SpinnerApp.vue";
import router from "@/router";
export default {
  name: "EditarPerfilView",
  components: { Form, Field, ErrorMessage, SpinnerApp },

  data() {
    return {
      criador: {},
      loading: true,
    };
  },

  created() {
    this.buscaCriador();
  },

  methods: {
    teste() {
      this.$swal({
        icon: "error",
        title: "Oops...",
        text: "Função em Desenvolvimento!",
      });
    },
    buscaCriador() {
      this.loading = true;
      const criador_id = sessionStorage.getItem("criador_id");

      if (criador_id) {
        adminApi
          .get(`criador/${criador_id}`)
          .then((response) => {
            this.criador = response.data;
            console.log(this.criador);
            this.loading = false;
          })
          .catch((error) => {
            console.log(error.request.response);

            var msg = error.response.data.message;
            this.$swal({
              icon: "error",
              title: "Ops algo deu errado!!",
              text: `${msg}`,
            });
          });
      } else {
        this.loading = false;
        router.push({ path: "/login" });
      }
    },

    validateName(value) {
      if (!value) {
        return "O campo nome  não esta prenchido";
      }

      if (value.length < 6) {
        return "O campo nome tem que ter no minimo 6 caracters";
      }

      this.criador.name = value;

      return true;
    },

    validateCpf_cnpj(value) {
      if (!value) {
        return "O campo CPF esta vazio";
      }

      if (value.length < 14) {
        return "O campo CPF tem que ter no minimo 14 caracters";
      }

      this.criador.cpf_cnpj = value;
      return true;
    },

    validateData_nascimento(value) {
      if (!value) {
        return "O campo Data de Nascimento esta vazio";
      }

      this.criador.data_nascimento = value;
      return true;
    },

    validateTelefone(value) {
      if (!value) {
        return "O campo Telefone esta vazio";
      }

      if (value.length < 15) {
        return "O campo telefone  tem que ter no minimo 15 caracters";
      }
      this.criador.telefone = value;
      return true;
    },

    validateEmail(value) {
      if (!value) {
        return "O campo Email esta vazio";
      }

      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return "Este não é um Email valido";
      }

      this.criador.email = value;
      return true;
    },

    validatePassword(value) {
      if (!value) {
        return "O campo Senha esta vazio";
      }

      if (value.length < 6) {
        return "A senha dever ter no minimo 6 caracters";
      }

      if (!/\d/.test(value)) {
        return "A senha dever um numero";
      }
      if (!/[A-Z]/.test(value)) {
        return "A senha deve ter no minimo 1 letra Maiscula";
      }

      const format = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
      if (!format.test(value)) {
        return "A senha dever no minimo 1 caracter especial";
      }
      this.criador.password = value;

      return true;
    },

    validatePassword_confirmation(value) {
      if (!value) {
        return "O campo Confirma Senha esta vazio";
      }

      if (value != this.criador.password) {
        return "O campo confirmar senha esta diferente do campo senha";
      }

      this.criador.password_confirmation = value;
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

section label {
  font-weight: bold;
  color: black;
  font-size: 1.8rem;
}

section h1 {
  font-size: 3.5rem;
  text-align: center;
  color: #18c07a;
  font-weight: bold;
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