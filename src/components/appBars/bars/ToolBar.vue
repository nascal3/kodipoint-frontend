<template>
    <v-app-bar flat app>
        <v-spacer></v-spacer>
        <template>
            <v-row align="center" justify="end" no-gutters>
                <div class="user d-flex flex-column justify-end">
                    <div class="user-name">{{loggedInUserInfo.name}}</div>
                    <div class="user-role">{{roleName}}</div>
                </div>
                <v-avatar>
                    <v-img :src="imageSource(loggedInUserInfo)"></v-img>
                </v-avatar>
                <span class="drop-menu">
                    <user-drop-menu/>
                </span>
            </v-row>
        </template>
    </v-app-bar>
</template>

<script>
import UserDropMenu from '@/components/appBars/utils/UserDropMenu'
import userProfileAvatar from '@/mixins/userProfileAvatar'
import formatRoleName from '@/mixins/formatRoleName'
import { mapGetters } from 'vuex'

export default {
  name: 'ToolBar',
  mixins: [userProfileAvatar, formatRoleName],
  components: {
    UserDropMenu
  },
  computed: {
    ...mapGetters({
      loggedInUserInfo: ['configs/loggedInUserInfo']
    })
  },
  created () {
    this.$store.dispatch('configs/getLoggedInUserInfo')
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/toolBar';
</style>
