import Pusher from 'pusher-js'
import Echo from 'laravel-echo'
import Config from 'config'

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: Config.pusher.key,
  cluster: 'eu',
  encrypted: true
});

export default {
  install (Vue, {store}) {
    window.Echo.channel('public')
      .listen('.laravel.vuex:mutation', (e) => {
        store.commit(e.namespace + '/' + e.mutation, {
          stateName: e.state,
          payload: e.payload
        })
        console.log('[EVENT MUTATION] : ' + e.namespace + '/' + e.mutation);
      });
  }
}

