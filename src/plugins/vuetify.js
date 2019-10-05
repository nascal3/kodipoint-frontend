import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import themeColors from './themeColors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: themeColors
  }
})
