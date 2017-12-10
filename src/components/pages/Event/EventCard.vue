<template>
  <v-flex v-bind="{ [`xs4`]: true }" >
    <v-card>
      <a :href="url" target="_blank">
      <v-card-media :src="image" height="200px">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline white--text" v-text="model.category + ' | ' + model.root_title"></span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      </a>
      <v-card-actions class="white">
        <div slot="header">
          <v-spacer></v-spacer>
          <v-btn @click="vote()" icon>
            <v-icon :color="model.voted ? 'red' : 'black'">favorite</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>bookmark</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>share</v-icon>
          </v-btn>
          <v-btn icon @click="showDetails">
            <v-icon>link</v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>


<script>
  import store from '@/store'
  import getImage from 'get-md-image';

  export default {
    props: ['model'],
    data () {
      return {
        base: "http://testnet.golos.io"
      }
    },
    methods: {
      vote () {
        store.vote(this.model.author, this.model.permlink).then(r => {
          this.voted = true
        }).catch(err => {
          console.error(err)
        })
      },
      showDetails () {
        window.open(this.base + this.model.url)
      }
    },
    computed: {
      image() {
        const img = getImage(this.model.body)
        return img && img.src
      },
      url() {
        return this.base + this.model.url
      }
    }
  }
</script>


