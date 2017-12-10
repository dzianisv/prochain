<template>
  <v-flex v-bind="{ [`xs${model.flex}`]: true }" >
    <v-card>
      <v-card-media
        :src="model.image"
        height="200px"
      >
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline white--text" v-text="model.title"></span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header">
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>favorite</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>bookmark</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>share</v-icon>
            </v-btn>
          </div>
          <div>{{model.title}}</div>
          <div>{{model.description}}</div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card>
  </v-flex>
</template>


<script>
  import store from '@/store'
  import config from '@/config'
  export default {
    props: ['model'],
    data: () => {
      return {
      }
    },
    methods: {
    }
  }
</script>


