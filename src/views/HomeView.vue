<template>
  <div class="home">
    <div class="container-fluid">
      <div class="box">
        <div class="container px-4 text-center">
          <div class="row align-items-center">
            <div class="col">
              <img src="../assets/images/img1.png" class="img-fluid" alt="igm">
            </div>
            <div class="col">
              <div class="divulga">
                <h2>Deseja criar seu proprio evento?</h2>
                <p>divulgue e promova seus eventos de forma rapida e facil !!</p>
                <div class="btn2">
                  <router-link to="/register">Tornece um criador agora!!</router-link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
};
</script>

<style scoped>
/* .container {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
} */

.box {
  background-color: #18c07a;
}

.divulga {

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
  padding: 3px 10px 3px 10px;
  background-color: #ffffff;
  border-radius: 50px 50px 50px 50px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  color: #18c07a;
  font-size: 1.5rem;
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
</style>