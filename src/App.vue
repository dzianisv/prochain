<template>
  <div id="app">
    <v-app>
      <navbar></navbar>
      <v-container>
        <router-view/>
      </v-container>
    </v-app>
  </div>
</template>
<script>
  import Navbar from './components/pages/Navbar'
  export default {
    name: 'app',
    components: {
      'navbar': Navbar
    }
  }
</script>
<style lang="scss">
  @import "./assets/styles";
</style>
