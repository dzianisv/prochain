<template>
  <v-flex v-bind="{ [`xs${petition.flex}`]: true }" >
    <v-card>
      <v-card-media
        :src="apiPath + '/' + petition.image"
        height="200px"
      >
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline white--text" v-text="petition.title"></span>
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
                <h3> {{ petition.title }} </h3>
                <h6> {{ petition.location }} </h6>
                <h6> {{ petition.title }} </h6>
                <div>{{ petition.description }}</div>
                <span class="grey--text">Уже подписали: {{ petition.votes_count }} </span><br>
                <v-progress-linear v-bind:value="petition.complete" height="10" color="success"></v-progress-linear>
                <v-btn :color="voted ? 'success' : 'primary'" dark @click="vote()">Подписать Петицию
                  <v-icon dark right>check_circle</v-icon>
                </v-btn>

              </div>
            </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-layout row justify-center>
          <v-flex xs12>
            <v-slide-y-transition>
              <v-card-text v-show="show">

                Прогресс:



              </v-card-text>
            </v-slide-y-transition>
          </v-flex>

        </v-layout>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>


<script>
  import actions from '@/actions'
  import config from '@/config'
  export default {
    props: ['petition'],
    data () {
      return {
        voted: localStorage.getItem(this.petition._id),
        show: false,
        apiPath: config.apiEndpoint
      }
    },
    methods: {
      vote () {
        actions.vote(this.petition._id).then(r => {
          this.voted = true
        }).catch(err => {
          console.error(err)
        })
      }
    }
  }
</script>


