<template>

  <div>
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon />

      <router-link to="/">
        <v-toolbar-title class="white--text">
          ProChain
        </v-toolbar-title>
      </router-link>

      <v-spacer />

      <v-btn flat v-if="user.username" @click="showNewEventModal = !showNewEventModal">
        Create Event
      </v-btn>

      <!-- <v-btn flat @click="showNewCommunityModal = !showNewCommunityModal">
        Create Community
      </v-btn> -->

      <v-text-field
        light
        solo
        prepend-icon="search"
        placeholder="Search"
        style="max-width: 500px; min-width: 128px"
        @input="onSearchStringChange"></v-text-field>

      <div class="d-flex align-center" style="margin-left: auto" v-if="user.username">
        <v-btn icon>
          <v-icon>notifications</v-icon>
        </v-btn>

        <div class="text-xs-center">
          <v-menu offset-y>
            <v-btn icon slot="activator">
              <v-avatar size="32px" tile>
                <v-icon>account_circle</v-icon>
              </v-avatar>
            </v-btn>
            <v-list>
              <v-list-tile @click="logout()">
                  <router-link style="text-decoration: none;" to="/">Logout</router-link>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
      </div>

      <router-link v-if="!user.username" to="login">
        <v-btn flat>
            Login
        </v-btn>
      </router-link>

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
    },
    onSearchStringChange(str) {
      store.search(str);
    }
  }
};
</script>
