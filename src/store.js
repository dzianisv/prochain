import config from '@/config'
import Axios from 'axios'
import _ from 'underscore'
import blockchain from 'golos-js';
// import blockchain from 'steem';

const store = {
  debug: true,
  state: {
    events: [],
    posts: [],
    communities: [],
    tags: [],
    user: {
    }
  },

  // API methods: https://github.com/GolosChain/golos-js/blob/master/doc/README.md
  // Steem methods: https://github.com/steemit/steem-js/tree/master/doc

  init() {
    blockchain.config.set('websocket', 'wss://ws.testnet.golos.io');
    blockchain.config.set('address_prefix', 'GLS');
    blockchain.config.set('chain_id', '5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');

    // blockchain.api.setSubscribeCallback(0, true, function(err, result) {
    //   console.log(err, result);
    // });

    try {
      Object.assign(this.state.user, JSON.parse(localStorage.getItem('user')))
    } catch (e) {
      // console.error(e);
    }
  },

  fetchEvents() {
    blockchain.api.getDiscussionsByCreated({ select_tags: ['prochain', 'event'].concat(this.state.tags), limit: 100 }, (err, res) => {
      console.log('fetchEvents', res);
      if (err) return;
      this.state.events.slice(0, this.state.events.length)

      _.each(res, (item, i) => {
        if (this.state.events.find(e => e.id === item.id)) { // hack, looks like there are bug in golos
          return;
        }

        this.state.events.push(item)
      });

      console.log('fetchEvents2', this.state.events);
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

  createEvent(title, description, tags, info) {
    const permlink = new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase()
    const body = description;
    tags = tags.concat(['event']);
    return new Promise((resolve, reject) => {
      blockchain.broadcast.comment(this.state.user.wif, '', 'prochain', this.state.user.username, permlink, title, body, {
        tags: tags, app: 'prochain', info: info}, function (err, result) {
          console.log('createEvent', err, result, info);
          return err ? reject(err.message || err.cause.message) : resolve(result)
        });
    })
  },

  createCommunity() {
    // blockchain.broadcast.comment(wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, function (err, result) {
    //   console.log(err, result);
    // });
  },

  vote(user, permlink) {
    return new Promise((resolve, reject) => {
      blockchain.broadcast.vote(this.state.user.wif, this.state.user.username, user, permlink, 1, function(err, result) {
        console.log('vote', err, result);
        return err ? reject(err.message || err.cause.message) : resolve(result);
      });
    });
  },
  search(str) {
    console.log('search', str);
    this.state.tags = str.toLowerCase().split();
    this.fetchEvents();
    this.fetchCommunities();
  }
};

store.init();

export default store
