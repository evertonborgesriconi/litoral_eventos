<template>
  <header>
    <div class="btn1">
      <router-link to="/">
         <img
        src="../assets/images/logo.png"
        alt="logo"
        class="rounded float-start"
      />
      </router-link>

      <router-link to="/"><h2>Litoral eventos</h2></router-link>
    </div>

    <div class="btn1">
      <router-link to="/login">Acesse sua Conta</router-link>
      <div class="btn2">
        <router-link to="/register">Cadastre-se</router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderApp",
};
</script>

<style scoped>
header {
  height: 6rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  margin-bottom: 5px;
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
}
header img {
  height: 6rem;
  width: 6rem;
  margin-right: 20px;
}

header h2 {
  color: rgb(24, 192, 122);
  font-size: 4rem;
}

header a {
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(24, 192, 122);
}

.btn1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.btn2 {
  margin-left: 0.5rem;
  padding: 3px 10px 3px 10px;
  background-color: #ffffff;
  border-radius: 50px 50px 50px 50px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

@media (max-width: 1000px) {
  header {
  height: 4rem;
}

  header img {
    height: 4rem;
    width: 4rem;
    margin-right: 10px;
  }

  header h2 {
    font-size: 2rem;
  }

  header a {
    text-decoration: none;
    font-size: 1rem;
    font-weight: bold;
    color: rgb(24, 192, 122);
  }

}

@media (max-width: 650px) {
  header {
  height: 3rem;
}

  header img {
    height: 3rem;
    width: 3rem;
    margin-right: 5px;
  }

  header h2 {
    font-size: 1.7rem;
  }

  header a {
    text-decoration: none;
    font-size: 1rem;
    font-weight: bold;
    color: rgb(24, 192, 122);
  }
  .btn2 {
    margin-left: 0.5rem;
    padding: 3px 10px 3px 10px;
    background-color: #ffffff;
    border-radius: 50px 50px 50px 50px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }
}

@media (max-width: 540px) {
  header {
  height: 2.8rem;
  padding-left:10px ;
  padding-right: 10px;
}

  header img {
    height: 2.5rem;
    width: 2.5rem;
    margin-right: 5px;
  }

  header h2 {
   display: none;
  }

  header a {
    text-decoration: none;
    font-size: 0.7rem;
    font-weight: bold;
    color: rgb(24, 192, 122);
  }
  .btn2 {
    margin-left: 0.5rem;
    padding: 1px 5px 1px 5px;
    background-color: #ffffff;
    border-radius: 50px 50px 50px 50px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }
}

@media (max-width: 390px) {

}
</style>