<template>
  <HeaderApp />
  <main>
    <router-view />
  </main>
  <FooterApp />
</template>
<script>
import HeaderApp from "./components/HeaderApp.vue";
import FooterApp from "./components/FooterApp.vue";
export default {
  data() {
    return {};
  },
  components: { HeaderApp, FooterApp },
};
</script>
<style>
#app {
  font-family: 'Podkova', serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: #f8f8fb;
}

main {
  flex: 1;
   padding: 0 1rem;
}
</style>
