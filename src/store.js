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

  // API methods: https://github.com/GolosChain/golos-js/blob/master/doc/README.md
  // Steem methods: https://github.com/steemit/steem-js/tree/master/doc

  init() {
    // blockchain.api.setOptions({ url: 'wss://ws.testnet.golos.io' }); // assuming websocket is work at ws.golos.io
    // blockchain.config.set('address_prefix','GLS');
    // blockchain.config.set('chain_id', '782a3039b478c839e4cb0c941ff4eaeb7df40bdd68bd441afd444b9da763de12');

    blockchain.api.setSubscribeCallback(0, true, function(err, result) {
      console.log(err, result);
    });

    try {
      Object.assign(this.state.user, JSON.parse(localStorage.getItem('user')))
    } catch (e) {
      // console.error(e);
    }
  },

  fetchEvents() {
    blockchain.api.getDiscussionsByCreated({ select_tags: ['prochain', 'event'], limit: 256 }, (err, res) => {
      console.log('fetchEvents', res);

      if (err) return;

      let flexes = [12, 6, 6, 9, 3, 9, 3, 3, 3, 3, 12]
      this.state.events.slice(0, this.state.events.length)

      _.each(res, (item, i) => {
        item.flex = flexes[i % flexes.length]
        item.complete = parseInt(Math.random() * 100)
        this.state.events.push(item)
      });
    });
  },

  fetchCommunities() {
  },

  login(data) {
    Object.assign(this.state.user, {
      username: data.username,
      wif: blockchain.auth.toWif(data.username, data.password, 'posting')
    })

    localStorage.setItem('user', JSON.stringify(this.state.user));
    console.log(this.state.user, data);
  },

  logout(data) {
    Object.assign(this.state.user, { username: null, admin: false, password: null })
    localStorage.setItem('user', null);
  },

  createEvent(title, description) {
    const permlink = title.replace(/ /g, '_')
    const body = description;

    blockchain.broadcast.comment(this.state.user.wif, null, null, this.user.username, permlink, title, body, { tags: ['prochain', 'event'], app: 'prochain' }, function (err, result) {
      console.log('createEvent', err, result);
    });
  },

  createCommunity() {
    // blockchain.broadcast.comment(wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, function (err, result) {
    //   console.log(err, result);
    // });
  },

  vote(user, permlink) {
    blockchain.broadcast.upvote(this.state.usern.wif, this.state.user.username, user, permlink, null, function(err, result) {
      console.log('vote', err, result);
    });
  }
};

store.init();

export default store
