import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import users from './modules/users'
import cars from './modules/cars'

export default new Vuex.Store({
  modules: {
    users,
    cars
  }
})
