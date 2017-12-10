<template>
  <div id="app">
    <v-app>
      <div style="display: flex; flex-direction: column;">
        <navbar></navbar>

        <div style="height: 90vh; overflow: auto">
          <v-container>
            <router-view/>
          </v-container>
        </div>

        <v-bottom-nav absolute :value="true" :active.sync="e1" color="transparent">
          <v-btn color='white' flat value="recent">
            <span>Recent</span>
            <v-icon>history</v-icon>
          </v-btn>
          <v-btn color='white' flat value="favorites">
            <span>Favorites</span>
            <v-icon>favorite</v-icon>
          </v-btn>
          <v-btn color='white' flat value="nearby">
            <span>Nearby</span>
            <v-icon>place</v-icon>
          </v-btn>
        </v-bottom-nav>
      </div>
  </v-card>
    </v-app>
  </div>
</template>
<script>
import Navbar from "./components/pages/Navbar";
export default {
  name: "app",
  components: {
    navbar: Navbar
  }
};
</script>
<style lang="scss">
@import "./assets/styles";
</style>
