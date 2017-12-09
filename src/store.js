import config from '@/config'
import Axios from 'axios'
import _ from 'underscore'
import blockchain from 'golos';

const store = {
  debug: true,
  state: {
    events: [],
    posts: [],
    communities: [],
    user: {
    }
  },

  init() {
    try {
      Object.assign(this.state.user, JSON.parse(localStorage.getItem('user')))
    } catch (e) {
      // console.error(e);
    }
  },

  fetchEvents() {
    // blockchain.api.getPostsByTag("", (err, res) => {
    //   if (err) return;

    //   let flexes = [12, 6, 6, 9, 3, 9, 3, 3, 3, 3, 12]
    //   this.state.events.slice(0, this.state.events.length)

    //   _.each(res.data.data, (item, i) => {
    //     item.flex = flexes[i % flexes.length]
    //     item.complete = parseInt(Math.random() * 100)
    //     this.state.events.push(item)
    //   })

    //   console.log('fetched', res.data.data.length, 'events')
    // })
  },

  fetchCommunities() {
  },

  login(data) {
    Object.assign(this.state.user, data)
    localStorage.setItem('user', JSON.stringify(this.state.user));
    console.log(this.state.user, data);
  },

  logout(data) {
    Object.assign(this.state.user, {username: null, admin: false, password: null})
    localStorage.setItem('user', null);
  }
}

store.init();

export default store
