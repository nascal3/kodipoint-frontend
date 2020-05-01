<template>
    <v-app-bar flat app>
        <v-img class="toolbar-logo" :src="require('@/assets/images/kodiPoint_logo.png')"></v-img>
        <v-spacer></v-spacer>
        <span class="page-name">{{pageTitle}}</span>
        <v-spacer></v-spacer>
        <template>
            <v-row align="center" justify="end" no-gutters>
                <span class="user-name">
                    <user-drop-menu/>
                </span>
            </v-row>
        </template>
    </v-app-bar>
</template>

<script>
import UserDropMenu from '@/components/appBars/utils/UserDropMenu'

export default {
  name: 'ToolBar',
  props: {
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    UserDropMenu
  },
  computed: {
    pageTitle () {
      return this.pageName || this.$route.name
    }
  }

}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/toolBar';
</style>
