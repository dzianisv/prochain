<template>
    <v-card class="ma-1" v-if="model.title">
      <v-card-title primary-title><h3 class="headline mb-0">{{model.root_title}}</h3>     </v-card-title>
      <div class="ma-3">
        <div>
          {{time}}
        </div>
        <div>
          {{info.location}}
        </div>
        <hr>

        <div class="ma-3">
          <vue-markdown>{{model.body}}</vue-markdown>
        </div>

        <div class="ma-3">
          <v-chip :key="tag" v-for="tag in model.metadata.tags">{{tag}}</v-chip>
        </div>

      </div>

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
import store from "@/store";
import moment from "moment";
import VueMarkdown from "vue-markdown";
export default {
  data() {
    return {
      state: store.state
    };
  },
  components: {
    VueMarkdown
  },
  mounted() {
    store
      .fetchContent(this.$route.params.author, this.$route.params.permlink)
      .catch(err => {
        console.error(err);
      });
  },
  methods: {
    vote() {
      store
        .vote(this.model.author, this.model.permlink)
        .then(r => {
          this.voted = true;
        })
        .catch(err => {
          console.error(err);
        });
    },
    showDetails() {
      window.open(this.base + this.model.url);
    }
  },
  computed: {
    url() {
      return this.base + this.model.url;
    },
    info() {
      return this.model.metadata.info;
    },
    time() {
      try {
        return moment.unix(this.model.metadata.info.time).toString();
      } catch (e) {
        console.error(e);
      }
    },
    model() {
      return store.state.content
    }
  }
};
</script>


