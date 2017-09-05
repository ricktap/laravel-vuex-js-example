import Vue from 'vue'
import App from './App.vue'
import Echo from './echo'
import store from './store'

Vue.use(Echo, {store})

new Vue({
  store,
  el: '#app',
  render: h => h(App)
})
