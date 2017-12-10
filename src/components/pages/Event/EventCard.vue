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
      <v-card-actions class="white">
        <v-expansion-panel>
          <v-expansion-panel-content>
            <div slot="header">
              <v-spacer></v-spacer>
              <v-btn @click="vote()" icon>
                <v-icon :color="voted ? 'red' : 'black'">favorite</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>bookmark</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>share</v-icon>
              </v-btn>
            </div>
            <v-card>
            <v-card-text class="grey lighten-3">
              <div>
                <h3> {{ model.title }} </h3>
                <h6> {{ model.location }} </h6>
                <div>{{ model.description }}</div>
              </div>
            </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>


<script>
  import actions from '@/actions'
  import config from '@/config'
  export default {
    props: ['model'],
    data () {
      return {
      }
    },
    methods: {
      vote () {
        actions.vote(this.model._id).then(r => {
          this.voted = true
        }).catch(err => {
          console.error(err)
        })
      }
    }
  }
</script>


