import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-socket.io'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false


Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8001',
  options: {} //Optional options 
}))

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
