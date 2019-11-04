<template>
    <v-app-bar flat app>

        <v-spacer></v-spacer>

        <template>
            <v-row align="center" justify="end" no-gutters>
                <span class="user-avatar">
                    <v-avatar>
                        <v-img src="https://randomuser.me/api/portraits/women/81.jpg"></v-img>
                    </v-avatar>
                </span>
                <span class="user-name">
                    <span>{{user.name}}</span>
                    <v-menu
                        transition="slide-y-transition"
                        bottom
                    >
                        <template v-slot:activator="{ on }">
                             <v-btn icon v-on="on">
                                <v-icon>mdi-dots-vertical</v-icon>
                             </v-btn>
                          </template>
                        <v-list class="user-menu" dense>
                            <v-list-item
                                v-for="item in items"
                                :key="item.title"
                                link
                            >
                                <v-list-item-icon>
                                    <v-icon class="user-menu-icons">{{ item.icon }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title class="user-menu-text">{{ item.title }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item @click="logout" link>
                                <v-list-item-icon>
                                    <v-icon class="user-menu-icons">mdi-logout</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title class="user-menu-text">Logout</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </span>
            </v-row>
        </template>
    </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ToolBar',
  data: () => ({
    items: [
      { title: 'Profile', icon: 'mdi-account-settings' },
      { title: 'Settings', icon: 'mdi-settings' }
    ]
  }),
  computed: {
    ...mapGetters('auth', {
      user: 'user'
    })
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/removeToken')
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/toolBar';
</style>
