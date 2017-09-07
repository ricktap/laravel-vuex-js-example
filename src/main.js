import Vue from 'vue'
import App from './App.vue'

import Pusher from 'pusher-js'
import Echo from 'laravel-echo'
import StoreCommiter from 'laravel-vuex/store-commiter'
import Config from './config'
import store from './store'

let echo = new Echo({
  broadcaster: 'pusher',
  key: Config.pusher.key,
  cluster: 'eu',
  encrypted: true
})

let channels = ['public']

Vue.use(StoreCommiter, { echo, channels, store,
  options: {
    debug: true
  }
})

new Vue({
  store,
  el: '#app',
  render: h => h(App)
})
