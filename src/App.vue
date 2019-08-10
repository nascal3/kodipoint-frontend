<template>
  <v-app>
    <v-content>
      <v-container fluid pa-0 ma-0>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data: () => ({
    //
  })
}
</script>
