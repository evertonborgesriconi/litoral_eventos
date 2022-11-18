<template>
  <div class="card">
    <h5 class="card-header">{{ local.nome_local }}</h5>
    <div class="card-body">
      <p class="card-text">{{ local.endereco }}</p>
      <div :class="tipe == true ? '' : 'close-btn'">
        <button @click="deleteLocal(local.local_id)">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardLocalApp",
  props: ["local", "tipe"],

  methods: {
    deleteLocal(id) {
      this.$emit("delele-local", id);
    },
  },
};
</script>

<style scoped>
.card {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin-bottom: 20px;
}

.card-header {
  font-size: 1.5rem;
  color: #18c07a;
  font-weight: bold;
}

.card-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-text {
  font-size: 1.2rem;
}

button {
  background-color: #fe0000;
  color: #000000;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
  margin-left: 15px;
  border: none;
  padding: 5px 10px 5px 10px;
}
button:hover{
  font-size: 1.2rem;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

.close-btn {
  display: none;
}
@media (max-width: 800px) {
  .card-header {
  font-size: 1rem;
  color: #18c07a;
  font-weight: bold;
}

.card-text {
  font-size: 0.9rem;
}
}
</style>