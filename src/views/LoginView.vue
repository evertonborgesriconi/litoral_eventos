<template>
  <section>
    <div class="col">
      <div class="form-input">
        <div class="container-fluid">
          <Form @submit="postLogin">
            <h2>Connectar-se</h2>
            <notifications position="top center" width="600px" />
            <div class="input-group mb-3">
              <Field
                name="email"
                type="email"
                :rules="validateEmail"
                placeholder="Email"
              />
              <ErrorMessage name="email" class="error" />
            </div>

            <div class="input-group mb-3">
              <Field
                name="password"
                type="password"
                :rules="validatePassword"
                placeholder="Senha"
              />
              <div class="reset-pass">
                <div><ErrorMessage name="password" class="error" /></div>
                <router-link to="/register">Esqueceu sua Senha?</router-link>
              </div>
            </div>

            <div v-if="loading" class="col-auto">
              <button type="submit" class="btn">Logar</button>
            </div>
            <div v-else class="col-auto">
              <SpinnerApp />
            </div>
          </Form>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="greem-box">
        <img src="../assets/images/img1.png" alt="img1" />
        <div class="box">
          <h2>
            Ainda não e cadastrado com criador? cadastre-se agora para poder
            divulgar seus eventos!!
          </h2>
          <div class="btn2">
            <router-link to="/register">Cadastre-se</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

    <script>
import router from "@/router";
import { api } from "../../http/index";
import { Form, Field, ErrorMessage } from "vee-validate";
import { notify } from "@kyvg/vue3-notification";
import SpinnerApp from "../components/SpinnerApp.vue";

//import { required, email } from '@vuelidate/validators'
export default {
  name: "LoginView",
  components: { Form, Field, ErrorMessage, SpinnerApp },

  data() {
    return {
      criador: {
        email: "",
        password: "",
      },

      errors: "",
      loading: true,
    };
  },

  methods: {
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

      this.criador.password = value;

      return true;
    },

    readlogin() {},

    postLogin() {
      this.loading = false;
      api
        .post("login", this.criador)
        .then((response) => {
          if (response.status == 200 || response.status == 201) {
            var criador = response.data.criador;
            var criadorId = criador.criador_id;

            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("criador_id", criadorId);

            //console.log(criador);
            notify({
              type: "success",
              text: "Login realizado com sucesso",
            });
            router.push({ path: `/deshboard/criador/:${criador.name}` });
            this.loading = true;
          }
        })
        .catch((error) => {
          console.log(error.request.response.message);
          if (error.request.status == 401) {
            this.$swal({
              icon: "error",
              title: "Ops algo deu errado!!",
              text: "Senha ou Email invalidos!",
            });
          } else {
            this.$swal({
              icon: "error",
              title: "Ops algo deu errado!!",
              text: `${error.request.response.message}`,
            });
          }
          this.loading = true;
        });
    },
  },
};
</script>
  <style scoped>
section {
  min-height: 90vh;
  display: flex;
  flex-direction: row;
}

.form-input {
  height: 100%;
  padding-left: 5rem;
  padding-right: 5rem;
}

.form-input input {
  background-color: #f8f8fb;
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  border: 2px solid #18c07a;
  color: #18c07a;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0.5rem;
}

.form-input input:hover {
  border: 2px solid #18c07a;
}
.form-input ::placeholder {
  color: #18c07a;
  opacity: 1;
}
.form-input h2 {
  font-size: 3.2rem;
  font-weight: bold;
  color: #18c07a;
  text-align: center;
  padding-top: 4rem;
  padding-bottom: 3rem;
}
.reset-pass {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.reset-pass a {
  color: #18c07a;
}
.reset-pass a:hover {
  color: #367359;
}

.error {
  color: red;
}

.form-input .btn {
  background-color: #18c07a;
  color: #ffffff;
  border-radius: 50px 50px 50px 50px;
  margin-bottom: 10px;
  width: 15rem;
  height: 3rem;
  font-size: 1.5rem;
  text-align: center;
}

.form-input .col-auto {
  text-align: center;
}

.greem-box {
  background-color: #1be18f;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.greem-box img {
  height: 20rem;
  width: 25rem;
}

.greem-box h2 {
  font-size: 2.5rem;
  color: #ffffff;
  text-align: center;
  padding-left: 2rem;
  padding-right: 2rem;
}
.greem-box a {
  text-decoration: none;
  font-size: 2.5rem;
  font-weight: bold;
  color: rgb(24, 192, 122);
}

.greem-box .box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.btn2 {
  text-align: center;
  margin-left: 0.5rem;
  padding: 3px 10px 3px 10px;
  width: 20rem;
  background-color: #ffffff;
  border-radius: 50px 50px 50px 50px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  margin-top: 4rem;
  margin-bottom: 4rem;
}

.nodi {
  font-size: 2rem;
}
</style>

