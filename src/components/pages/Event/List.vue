<template>
  <div>
    <v-container grid-list-md class="grey lighten-4">
      <v-layout row wrap>
        <v-flex sm12 md3 v-for="model in events" :key="model.id">
          <event  :model="model" />
        </v-flex>
      </v-layout>

      <!-- <v-layout row wrap>
        <community v-for="model in communities" v-bind:model="model"  v-bind:key="model.id" />
      </v-layout> -->

    <router-link to="/event/new" v-if="user.username">
      <v-btn
        fab
        bottom
        right
        color="primary"
        dark
        fixed
        @click.stop="dialog = !dialog"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </router-link>

    </v-container>
  </div>
</template>

<script>
import EventCard from "@/components/pages/Event/EventCard";
import CommunityCard from "@/components/pages/Community/CommunityCard";
import store from "@/store";

export default {
  props: ['model'],
  data() {
    return {
      state: store.state
    };
  },
  created() {
    this.fetch();
  },
  components: {
    event: EventCard,
    community: CommunityCard
  },

  computed: {
    user() {
      return store.state.user
    },
    events() {
      return store.state.events
    }
  },

  methods: {
    fetch() {
      store.fetchEvents();
      store.fetchCommunities();
    }
  }
};
</script>
