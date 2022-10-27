<template>
  <section>
    <div v-if="!loading">
      <nav>
        <div class="clickable" @click="getHome()">
          Bem vindo!! {{ criador.name }}
        </div>
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          ><i class="fa-solid fa-bars"></i
        ></a>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" href="#" @click="editaPerfil()"
              >Editar perfil</a
            >
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item" href="#" @click="logout()">Sair</a></li>
        </ul>

        <!-- <button type="submit" class="btn">Meu perfil</button> -->
      </nav>
      <div class="container-fluid">
        <router-view />
      </div>
    </div>
    <div v-else class="centro">
      <SpinnerApp />
    </div>
  </section>
</template>

<script>
import { adminApi } from "../../../http/index";
import router from "@/router";
import SpinnerApp from "../../components/SpinnerApp.vue";

export default {
  name: "DashbordView",
  props: ["username"],
  components: { SpinnerApp },
  data() {
    return {
      loading: false,
    };
  },
  created() {
    this.getCriador();
  },

  computed: {
    criador() {
      return this.$store.state.criador;
    },
  },
  methods: {
    logout() {
      adminApi
        .post("logout")
        .then((response) => {
          if (response.status == 200 || response.status == 201) {
            sessionStorage.setItem("token", "");
            sessionStorage.setItem("criador_id", "");

            router.push({ path: "/" });
          }
        })
        .catch(() => {
         // console.log(error.request.response);
        });
    },

    editaPerfil() {
      router.push({
        path: `/deshboard/criador/${this.criador.name}/editar-perfil`,
      });
    },
    getHome() {
      router.push({ path: `/deshboard/criador/${this.criador.name}` });
    },
    getCriador() {
      this.loading = true;
      const criador_id = sessionStorage.getItem("criador_id");

      if (criador_id) {
        adminApi
          .get(`criador/${criador_id}`)
          .then((response) => {
            this.$store.commit("pegaCriador", response.data);
            this.loading = false;
          })
          .catch(() => {
            //console.log(error.request.response);
          });
      } else {
        this.loading = false;
        router.push({ path: "/login" });
      }
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #4b48480f;
  width: 100%;
  font-size: 2.9rem;
  font-weight: bold;
  color: #18c07a;
  padding-left: 1rem;
  padding-right: 1rem;
}
.btn {
  background-color: #18c07a;
  color: #ffffff;
  border-radius: 5%;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}
.clickable {
  cursor: pointer;
}

.btn:hover {
  color: #18c07a;
  font-size: 1.6rem;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

.centro {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>