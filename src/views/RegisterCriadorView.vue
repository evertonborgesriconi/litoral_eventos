<template>
  <section>
    <div class="row align-items-start">
      <div class="col">
        <h2>Cadastro de criador</h2>

        <div class="container-fluid">
          <Form @submit="postRegister">
            <div class="mb-3">
              <label class="form-label">Nome Completo</label>

              <Field
                name="name"
                type="text"
                :rules="validateName"
                class="form-control"
              />
              <ErrorMessage name="name" class="error" />
            </div>
            <div class="mb-3">
              <label class="form-label">CPF</label>

              <Field
                name="cpf_cnpj"
                type="text"
                :rules="validateCpf_cnpj"
                class="form-control"
                v-mask="'###.###.###-##'"
              />
              <ErrorMessage name="cpf_cnpj" class="error" />
            </div>
            <div class="mb-3">
              <label class="form-label">Data Nascimento</label>

              <Field
                name="data_nascimento"
                type="date"
                :rules="validateData_nascimento"
                class="form-control"
              />
              <ErrorMessage name="data_nascimento" class="error" />
            </div>
            <div class="mb-3">
              <label class="form-label">Telefone</label>

              <Field
                name="telefone"
                type="tel"
                :rules="validateTelefone"
                class="form-control"
                v-mask="'(##) #####-####'"
              />
              <ErrorMessage name="telefone" class="error" />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>

              <Field
                name="email"
                type="email"
                :rules="validateEmail"
                class="form-control"
              />
              <ErrorMessage name="email" class="error" />
            </div>
            <div class="mb-3">
              <label class="form-label">Senha</label>
              <Field
                name="password"
                type="password"
                :rules="validatePassword"
                class="form-control"
              />
              <ErrorMessage name="password" class="error" />
            </div>
            <div class="mb-3">
              <label class="form-label">Confirma Senha</label>
              <Field
                name="password_confirmation"
                type="password"
                :rules="validatePassword_confirmation"
                class="form-control"
              />
              <ErrorMessage name="password_confirmation" class="error" />
            </div>
            <div v-if="!loading" class="col-auto">
              <button type="submit" class="btn">Cadastrar-se</button>
            </div>
            <div v-else class="col-auto">
              <p>Verificando informaçoes</p>
            </div>
          </Form>
        </div>
      </div>
      <div class="col-6">
        <img src="../assets/images/img2.png" alt="img1" />
        <div class="box">
          <h2>
            Você cadastrado com criador para poder divulgar a TODOS seus
            eventos!!
          </h2>
        </div>
      </div>
    </div>
  </section>
</template>
  
  <script>
import router from "@/router";
import { api } from "../../http/index";
import { Form, Field, ErrorMessage } from "vee-validate";
//import MessageApp from "../components/MessageApp.vue";

//import { required, email } from '@vuelidate/validators'
export default {
  name: "RegisterCriadorView",
  components: { Form, Field, ErrorMessage },

  data() {
    return {
      criador: {
        name: "",
        email: "",
        cpf_cnpj: "",
        data_nascimento: null,
        telefone: "",
        password: "",
        password_confirmation: "",
      },

      errors: "",
      checkErros: false,
      loading: false,
    };
  },

  methods: {
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

    postRegister() {
      api
        .post("register", this.criador)
        .then((response) => {
          if (response.status == 200 || response.status == 201) {
            router.push({ path: "/login" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.col-6 {
  background-color: #18c07a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.col-6 img {
  height: 25rem;
  width: 30rem;
}

.col-6 .box {
  margin-top: 20px;
  margin-bottom: 35px;
  width: 100%;
}

.col-6 h2 {
  font-size: 2.5rem;
  color: #ffffff;
  padding-left: 6rem;
  padding-bottom: 4.6rem;
}

.col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.col h2 {
  font-size: 2.5rem;
  color: #18c07a;
}

.col .col-auto {
  text-align: center;
}

.col .btn {
  background-color: #18c07a;
  color: #ffffff;
  border-radius: 50px 50px 50px 50px;
  margin-bottom: 10px;
}
.error {
  color: red;
}
</style>
    
