<template>
    <v-navigation-drawer
        app
        v-model="drawer"
        width="130"
        :src="bg"
        clipped-left
        permanent
        dark
    >
        <v-list-item class="menu-user-section" >
            <v-avatar>
                <v-img src="https://randomuser.me/api/portraits/women/81.jpg"></v-img>
            </v-avatar>
            <div class="user-name">{{user.name}}</div>
        </v-list-item>

        <v-list shaped dense>
            <v-list-item
                v-for="item in items"
                :key="item.title"
                router :to="item.route"
                link
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="menu-items-text">{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navigation',
  data: () => ({
    drawer: true,
    bg: 'src/assets/images/menu_bg.jpg'
  }),
  computed: {
    ...mapGetters('auth', {
      user: 'user'
    }),
    items () {
      const tokenVals = localStorage.getItem('kodiAuthToken')
      const role = JSON.parse(tokenVals).user.role
      if (role === 'admin') {
        return [
          { title: 'Landlords', icon: 'mdi-account-tie', route: '/landlords' },
          { title: 'Tenants', icon: 'mdi-account-group', route: '/tenants' },
          { title: 'Finance', icon: 'mdi-bank', route: '/finance' }
        ]
      } else if (role === 'landlord' || role === 'landlord/tenant') {
        return [
          { title: 'Properties', icon: 'mdi-home-city', route: '/properties' },
          { title: 'Tenants', icon: 'mdi-account-group', route: '/tenants' },
          { title: 'Finance', icon: 'mdi-bank', route: '/finance' }
        ]
      } else if (role === 'tenant') {
        return [
          { title: 'Finance', icon: 'mdi-bank', route: '/finance' }
        ]
      }
      return []
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/navigation';
</style>
