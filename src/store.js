import config from '@/config'
import Axios from 'axios'
import _ from 'underscore'
import blockchain from 'golos-js'
import moment from 'moment'
import promisify from 'promisify-es6'
import Vue from 'vue'

// import blockchain from 'steem';
const DEMO = process.env['NODE_ENV'] === 'development';

const store = {
  debug: true,
  state: {
    events: [],
    posts: [],
    communities: [],
    data: [],
    tags: [],
    user: {username: null},
    content: null
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

    blockchain.api.getDynamicGlobalProperties(function (err, result) {
      console.log('dynamic global properties:', err, result);
    });

    blockchain.api.getChainProperties(function (err, result) {
      console.log('current chain properties:', err, result);
    });

    try {
      Object.assign(this.state.user, JSON.parse(localStorage.getItem('user')))
    } catch (e) {
      // console.error(e);
    }

    // TODO: redesign
    setInterval(this.fetchEvents.bind(this), 5000);
  },

  fetchEvents() {
    if (DEMO) {
      for (let i = 0; i < 10; i++) {
        this.state.data.push({
          root_title: `Event #${i}`,
          title: `Event #${i}`,
          id: i,
          author: `author${i}`,
          permlink: `permlink${i}`,
          body: `We invite you to mega event in our city`,
          json_metadata: JSON.stringify({ tags: ['event'], app: 'prochain', info: { location: 'Belarus, Minsk, Imaguru', time: moment().unix() } })
        });
      }

      this.filter();
      this.state.content = this.state.events[0];
    } else {
      return new Promise((resolve, reject) => {
        blockchain.api.getDiscussionsByCreated({ select_tags: ['prochain', 'event'].concat(this.state.tags), limit: 100 }, (err, res) => {
          console.log('fetchEvents', res);
          if (err) return reject(err);
          this.state.data = res;
          this.filter();
          return resolve(res);
        });
      });
    }
  },

  fetchEvent(author, permlink) {
    return promisify(blockchain.api.getContent)(author, permlink)
      .then((res) => {
        console.log(`got ${author}:${permlink} content`)
        this.state.content = res;
      })
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
        tags: tags, app: 'prochain', info: info
      }, function (err, result) {
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
      blockchain.broadcast.vote(this.state.user.wif, this.state.user.username, user, permlink, 1, function (err, result) {
        console.log('vote', err, result);
        return err ? reject(err.message || err.cause.message) : resolve(result);
      });
    });
  },
  search(str) {
    console.log('search', str);
    this.state.tags = str.toLowerCase().split();
    this.filter();
  },

  filter() {
    this.state.events.splice(0, this.state.events.length)

    _.each(this.state.data, (item, i) => {
      try {
        item.metadata = JSON.parse(item.json_metadata);
      } catch (e) {
        console.error('filter', item, e);
      }

      const itemTags = item.metadata.tags.concat([item.title.toLowerCase(), item.body.toLowerCase(), moment.unix(item.metadata.info.time).toISOString()])
      // filter-out items using search string
      for (let tag of this.state.tags) {
        let found = false

        for (let tag1 of itemTags) {
          if (tag1.indexOf(tag) !== -1) {
            found = true
            break
          }
        }

        if (!found) {
          console.log('not found for ', itemTags)
          return
        }
      }

      if (this.state.events.find(e => e.id === item.id)) { // hack, looks like there are bug in golos
        return;
      }

      this.state.events.push(item)
    });
  }
};

store.init();

export default store
