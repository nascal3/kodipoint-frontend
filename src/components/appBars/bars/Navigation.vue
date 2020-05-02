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
                <v-img :src=email></v-img>
            </v-avatar>
            <div class="user-name">{{user.name}}</div>
        </v-list-item>

        <v-list shaped dense>
            <v-list-item
                v-for="page in pages"
                :key="page.title"
                router :to="page.route"
                link
                @click="setPageTitle(page)"
            >
                <v-list-item-icon>
                    <v-icon>{{ page.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="menu-items-text">{{ page.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { routePermissions } from '@/config'
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  name: 'Navigation',
  data: () => ({
    drawer: true,
    bg: 'src/assets/images/menu_bg.jpg',
    token: {}
  }),
  computed: {
    ...mapGetters('auth', {
      user: 'user'
    }),
    email () {
      return `https://api.adorable.io/avatars/201/${this.token.user.email}.png`
    },
    pages () {
      const role = this.token.user.role
      if (role === 'super') {
        return routePermissions.superUser
      } else if (role === 'admin') {
        return routePermissions.adminUser
      } else if (role === 'landlord') {
        return routePermissions.landlordUser
      } else if (role === 'landlord/tenant') {
        return routePermissions.landlordTenantUser
      } else if (role === 'tenant') {
        return routePermissions.tenantUser
      }
      return []
    }
  },
  methods: {
    setPageTitle (page) {
      this.$emit('changePageTitle', page.title)
    }
  },
  created () {
    this.token = store.getters['auth/token']
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/navigation';
</style>
