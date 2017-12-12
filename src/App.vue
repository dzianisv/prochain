<template>
  <div id="app">
    <v-app>
        <v-navigation-drawer fixed clipped app v-model="drawer">
          <v-list dense>
            <template v-for="(item, i) in items">
              <v-layout
                row
                v-if="item.heading"
                align-center
                :key="i"
              >
                <v-flex xs6>
                  <v-subheader v-if="item.heading">
                    {{ item.heading }}
                  </v-subheader>
                </v-flex>
                <v-flex xs6 class="text-xs-center">
                  <a href="#!" class="body-2 black--text">EDIT</a>
                </v-flex>
              </v-layout>
              <v-list-group v-else-if="item.children" v-model="item.model" no-action>
                <v-list-tile slot="item">
                  <v-list-tile-action>
                    <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ item.text }}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile
                  v-for="(child, i) in item.children"
                  :key="i"
                >
                  <v-list-tile-action v-if="child.icon">
                    <v-icon>{{ child.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ child.text }}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-group>
              <v-list-tile v-else @click="">
                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-navigation-drawer>

        <v-toolbar dark color="primary" clipped-left fixed app align-end justify-end>
            <v-toolbar-side-icon @click.stop="drawer = !drawer" />
            <router-link to="/"> <v-toolbar-title class='white--text'>ProChain</v-toolbar-title></router-link>
            <v-spacer />

            <v-layout row>
              <v-text-field solo placeholder="Search..." single-line append-icon="search" :append-icon-cb="() => {}" class="white--text hidden-sm-and-down" @input="onSearchStringChanged" hide-details></v-text-field>
              <span v-if="user.username">
                <v-btn icon ><v-icon>notifications</v-icon></v-btn>
                <div style="display: inline-block">
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
              </span>
            </v-layout>

            <router-link v-if="!user.username" to="login">
              <v-btn flat>
                Login
              </v-btn>
            </router-link>
        </v-toolbar>

        <v-content style="height: calc(100vh - 48px); overflow: auto">
          <router-view/>
        </v-content>

        <v-bottom-nav v-if="mobile" absolute :value="true" :active.sync="e1" color="transparent">
        <v-btn color='white' flat value="recent">
          <span>Recent</span>
          <v-icon>history</v-icon>
        </v-btn>
        <v-btn color='white' flat value="favorites">
          <span>Favorites</span>
          <v-icon>favorite</v-icon>
        </v-btn>
        <v-btn color='white' flat value="nearby">
          <span>Nearby</span>
          <v-icon>place</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-app>
  </div>
</template>
<script>
import store from "@/store";

export default {
  name: "app",
  data() {
    return {
      items: [
        { icon: "event", text: "Events" },
        { icon: "history", text: "Help in organizing" },
        // {
        //   icon: 'keyboard_arrow_up',
        //   'icon-alt': 'keyboard_arrow_down',
        //   text: 'Labels',
        //   model: true,
        //   children: [
        //     { icon: 'add', text: 'Create label' }
        //   ]
        // },
        { icon: "settings", text: "Settings" },
        { icon: "chat_bubble", text: "Send feedback" },
        { icon: "help", text: "Help" }
      ],
      user: store.state.user,
      drawer: false
    };
  },
  computed: {
    mobile() {
      return false;
    }
  },
  methods: {
    logout() {
      store.logout();
    },
    onSearchStringChanged(str) {
      store.search(str);
    }
  }
};
</script>
<style lang="scss">
@import "./assets/styles";
</style>
