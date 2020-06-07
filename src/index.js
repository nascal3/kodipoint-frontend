import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'

import Toasted from 'vue-toasted'
import VeeValidate from 'vee-validate'
import VueTheMask from 'vue-the-mask'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueTheMask)
Vue.use(VeeValidate, {
  fieldsBagName: 'vvFields'
})
Vue.use(Toasted, {
  className: 'custom-toast',
  duration: 3500
})
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.API_KEY,
    libraries: 'places'
  },
  autobindAllEvents: true
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
