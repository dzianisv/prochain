<template>

  <div>
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <router-link to="/">
        <v-toolbar-title class="white--text">
          Professional Chains
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn flat @click="showNewEventModal = !showNewEventModal">
        Create Event
      </v-btn>
      <v-btn flat @click="showNewCommunityModal = !showNewCommunityModal">
        Create Community
      </v-btn>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <router-link to="#" v-if="loggedIn">
        <v-btn flat @click="logout()">
          Logout
        </v-btn>
      </router-link>

      <router-link to="login" v-if="!loggedIn">
        <v-btn flat>
          Login
        </v-btn>
      </router-link>
    </v-toolbar>
    <new-petition v-bind:show="showNewEventModal"/>
    <new-voting v-bind:show="showNewCommunityModal"/>
  </div>
</template>


<script>
  import NewEvent from '@/components/pages/Event/NewEvent'
  import NewCommunity from '@/components/pages/Community/NewCommunity'
  import store from '@/store'

  export default {
    data () {
      return {
        showNewEventModal: false,
        showNewCommunityModal: false,
        user: store.state.user
      }
    },
    components: {
      'new-petition': NewEvent,
      'new-voting': NewCommunity
    },
    methods: {
      logout () {
        store.logout()
      }
    },
    computed: {
      loggedIn () {
        return this.user.username
      }
    }
  }
</script>
