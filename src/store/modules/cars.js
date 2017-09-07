import EventMutations from 'laravel-vuex/mutations/event-mutations'
import RestApiActions from 'laravel-vuex/actions/rest-api-actions'
import Config from '../../config'

const state = {
  all: []
}

const getters = {
  all: state => state.all
}

const actions = RestApiActions.get(Config.api + '/api/cars', {
  reader: function(response) {
    return response.data
  },
  params: {
    fill: {
      includes: 'user'
    }
  }
})
const mutations = EventMutations.get()

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
