<template>
  <header>
    <div class="btn1">
         <img
      src="../assets/images/logo.png"
      alt="logo"
      class="rounded float-start"
    />
    <h2>Litoral eventos RS</h2>
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
  margin-bottom: 10px;
  
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
a:hover {
  
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
  border-radius: 50px 50px 50px 50px;;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);;

}
</style>