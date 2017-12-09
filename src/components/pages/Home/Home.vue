<template>
  <div>
    <v-container fluid grid-list-md class="grey lighten-4">
      <v-layout row wrap>
        <voting v-for="model in events" v-bind:model="model"  v-bind:key="model._id" />
      </v-layout>

      <v-layout row wrap>
        <petition v-for="model in communities" v-bind:model="model"  v-bind:key="model._id" />
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import EventCard from '@/components/pages/Event/EventCard'
  import CommunityCard from '@/components/pages/Community/CommunityCard'
  import store from '@/store'

  export default {
    data () {
      return {
        controller: 'Home',
        events: store.state.events,
        communities: store.state.communities
      }
    },
    created () {
      this.fetch()
    },
    components: {
      'event': EventCard,
      'community': CommunityCard
    },
    methods: {
      fetch () {
        store.fetchEvents()
        store.fetchCommunities()
      }
    }
  }
</script>
