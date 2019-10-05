<template>
  <v-app>
    <AppBars></AppBars>
    <v-content>
      <v-container clearTop pa-0 fluid>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppBars from './components/AppBars'

export default {
  name: 'App',
  components: {
    AppBars
  },
  data: () => ({
    //
  })
}
</script>

<style lang="scss">
  @import 'src/styles/layout/body';
</style>
