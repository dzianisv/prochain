<template>

  <div>
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <router-link to="/">
        <v-toolbar-title class="white--text">
          ProChains
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn flat @click="showNewEventModal = !showNewEventModal">
        Create Event
      </v-btn>
      <v-btn flat @click="showNewCommunityModal = !showNewCommunityModal">
        Create Community
      </v-btn>
      <v-text-field
        light
        solo
        prepend-icon="search"
        placeholder="Search"
        style="max-width: 500px; min-width: 128px"
      ></v-text-field>

      <div class="d-flex align-center" style="margin-left: auto">
        <v-btn icon>
          <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>notifications</v-icon>
        </v-btn>

      <div class="text-xs-center">
        <v-menu offset-y>
          <v-btn icon large slot="activator" color="primary">
            <v-avatar size="32px" tile>
              <img
                src="https://vuetifyjs.com/static/doc-images/logo.svg"
                alt="Vuetify"
              >
            </v-avatar>
          </v-btn>
          <v-list>
            <v-list-tile v-if="user.username" @click="logout()">
                <router-link to="/">Logout</router-link>
            </v-list-tile>
            <v-list-tile v-if="!user.username">
                <router-link to="login">Login</router-link>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
      </div>
    </v-toolbar>
    <new-petition v-bind:show="showNewEventModal" @close="showNewEventModal=false"/>
    <new-voting v-bind:show="showNewCommunityModal" @close="showNewCommunityModal=false"/>
  </div>
</template>

<script>
import NewEvent from "@/components/pages/Event/NewEvent";
import NewCommunity from "@/components/pages/Community/NewCommunity";
import store from "@/store";

export default {
  data() {
    return {
      showNewEventModal: false,
      showNewCommunityModal: false,
      user: store.state.user
    };
  },
  components: {
    "new-petition": NewEvent,
    "new-voting": NewCommunity
  },
  methods: {
    logout() {
      store.logout();
    }
  }
};
</script>
