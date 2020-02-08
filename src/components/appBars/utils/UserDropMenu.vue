<template>
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
</template>

<script>
export default {
  name: 'UserDropMenu',
  data: () => ({
    items: [
      { title: 'Profile', icon: 'mdi-account-settings' },
      { title: 'Settings', icon: 'mdi-settings' }
    ]
  }),
  methods: {
    logout () {
      this.$store.dispatch('auth/removeToken')
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>

</style>
