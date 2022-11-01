<template>
  <div class="card-evento">
    <div class="card" style="width: 20rem">
      <img class="card-img-top" src=".././assets/images/imgteste.jpg" alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardApp",
};
</script>

<style scoped>
.card-evento{
  margin-top: 10px;
}
.card-evento:hover{
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;
  font-size: 1.1rem;
}

.card-title{
  text-align: center;
  color: #18c07a;
  font-size: 1.4rem;
  font-weight: bold;
}
</style>