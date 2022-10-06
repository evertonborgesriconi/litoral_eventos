<template>
  <section>
    <div class="row align-items-start">
      <div class="col">
        <h2>Cadastro de criador</h2>

        <div class="container-fluid">
          <div class="mb-3">
            <label class="form-label">Nome Completo</label>
            <input
              type="text"
              class="form-control"
              placeholder="Exemplo fulano de tal"
              v-model="criador.nome"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">CPF</label>
            <input
              type="text"
              class="form-control"
              placeholder="000.000.000-00"
              v-mask="'###.###.###-##'"
              v-model="criador.cpf"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Data Nascimento</label>
            <input type="date" class="form-control" v-model="criador.data_nascimento" />
          </div>
          <div class="mb-3">
            <label class="form-label">Telefone</label>
            <input
              type="tel"
              class="form-control"
              placeholder="(00)00000-0000"
              v-mask="'(##) #####-####'"
              v-model="criador.telefone"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              placeholder="exemplo@gmail.com"
              v-model="criador.email"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Senha</label>
            <input type="password" class="form-control" v-model="criador.password" />
          </div>
          <div class="mb-3">
            <label class="form-label">Confirma Senha</label>
            <input
              type="password"
              class="form-control"
              v-model="criador.password_confirmation"
            />
          </div>
          <div v-if="checkErros" class="col-auto">
            <button type="submit" class="btn" @click="postRegister()">Cadastrar-se</button>
          </div>
          <div v-else class="col-auto">
            <p>Verificando informaçoes</p>
          </div>
        </div>
      </div>
      <div class="col-6" >
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
//import { api } from "../../http/index";

export default {
  name: "RegisterCriadorView",

  data() {
    return {
      criador: {
        nome: "",
        cpf: "",
        data_nascimento: null,
        telefone: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      errors: [],
      checkErros: true,
    };
  },

  methods: {
    validacao() {
      if (!this.criador.nome) {
        this.errors.push("O campo nome nao foi prenchido");
        return false;
      } else if (!this.criador.cpf) {
        this.errors.push("O campo cpf nao foi prenchido");
        return false;
      } else if (!this.criador.data_nascimento) {
        this.errors.push("O campo data nascimento nao foi prenchido");
        return false;
      } else if (!this.criador.telefone) {
        this.errors.push("O campo telefone nao foi prenchido");
        return false;
      } else if (!this.criador.email) {
        this.errors.push("O campo email nao foi prenchido");
        return false;
      } else if (!this.criador.password) {
        this.errors.push("O campo senha nao foi prenchido");
        return false;
      } else if (!this.criador.password_confirmation) {
        this.errors.push("O campo confirma senha nao foi prenchido");
        return false;
      }
      return true;
    },

    postRegister() {

      this.checkErros = true;
      if (!this.validacao()) {
        this.checkErros = true;
        console.log("teu errro");
        console.log(this.criador);
        this.checkErros = false;
      } else {
        console.log("funcionona");
        console.log(this.criador);
        // api.post("register").then((response) => {
        //   this.distriMensal = response.data;

        //   this.filterDistribuidores();
        // });
      }
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
</style>
    
