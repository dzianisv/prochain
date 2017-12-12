<template>
    <v-card>
      <a :href="url" target="_blank" style="text-decoration: none">
        <v-card-media :src="image" height="200px" v-if="image" />
        <v-card v-else height="200px" color="blue lighten-1">
        </v-card>
      </a>
      <v-card-title primary-title><h3 class="headline mb-0">{{model.root_title}}</h3>
      <div>
        <div>
          {{time}}
        </div>
        <div>
          {{info.city}} {{info.country}}
        </div>
        <div>
          {{info.address || '-'}}
        </div>
      </div>
     </v-card-title>
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
        </div>
      </v-card-actions>
    </v-card>
</template>


<script>
  import store from '@/store'
  import getImage from 'get-md-image';
  import moment from 'moment'

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
      },
      info() {
        return this.model.metadata.info;
      },
      time() {
        try {
          return moment.unix(this.model.metadata.info.time).toString()
        } catch (e) {
          console.error(e)
        }
      }
    }
  }
</script>


