import Vue from 'vue'
import App from './App.vue'
import router from './router'
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io'
import store from './store'
import config from './utils/config'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: socketio(`${config.baseUrl}`, { path: '/socket'}),
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
}))

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
