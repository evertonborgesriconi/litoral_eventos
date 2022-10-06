<template>
  <div class="message">{{ msg }}</div>
</template>
  
  <script>
export default {
  name: "MessageApp",
  props: {
    msg: String,
  },
};
</script>
  
  <style scoped>
.message {
  width: 100%;
  padding: 1em;
  border: 1px solid #000;
  text-align: center;
  margin-bottom: 2em;
  border-radius: 5px;
  background-color: rgb(173, 79, 79);
}
</style>