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
                  >Tornece um criador agora!!</router-link
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
          <div class="col-11">
            <div class="search-box">
              <input
                type="text"
                class="input-search"
                placeholder="pesquisar por eventos..."
              />
            </div>
            <div class="row align-items-center">
              <div class="col">
                <div class="ac">
                  <div>
                    <select name="categoria">
                      <option disabled selected value="">Categorias</option>
                      <option
                        v-for="item in categorias"
                        :key="item.categoria_id"
                        :value="item.categoria_id"
                      >
                        {{ item.nome_categoria }}
                      </option>
                    </select>
                    <select name="assunto">
                      <option disabled value="">Assunto</option>
                      <option
                        v-for="item in assuntos"
                        :key="item.assunto_id"
                        :value="item.assunto_id"
                      >
                        {{ item.nome_assunto }}
                      </option>
                    </select>
                  </div>

                  <div class="btn2">Procurar eventos na minha região</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <button><i class="fa-solid fa-magnifying-glass"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { api } from "../../http/index";
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      assuntos: [],
      categorias: [],
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
          this.assuntos = response.data;
          console.log(this.assuntos);
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
          console.log(this.categorias);
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
  padding: 3px 10px 3px 10px;
  background-color: #ffffff;
  border-radius: 50px 50px 50px 50px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  color: #18c07a;
  font-size: 1.5rem;
  text-align: center;
  border: none;
  margin-right: 10px;
  font-weight: bold;
}

.ac {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>