<template>
  <v-app>
    <AppBars v-if="loggedIn"></AppBars>
    <v-main>
      <v-container ma-0 pa-0 fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBars from './components/appBars/AppBars'
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
  @import 'src/styles/base/global';
</style>
