<template>
  <v-app>
    <AppBars v-if="loggedIn"></AppBars>
    <v-content>
      <v-container ma-0 pa-0 fluid>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppBars from './components/AppBars'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    AppBars
  },
  computed: {
    ...mapGetters('auth', {
      loggedIn: 'loggedIn'
    })
  }
}
</script>

<style lang="scss">
  @import 'src/styles/layout/body';
</style>
