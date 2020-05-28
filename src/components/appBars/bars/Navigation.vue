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
                :disabled="approved"
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
import { mappedRoutePermissions } from '@/config'
import { mapGetters } from 'vuex'

export default {
  name: 'Navigation',
  data: () => ({
    drawer: true,
    bg: require('@/assets/images/menu_bg.jpg')
  }),
  computed: {
    ...mapGetters({
      user: ['auth/user'],
      token: ['auth/token'],
      loggedInUserInfo: ['configs/loggedInUserInfo']
    }),
    approved () {
      if (this.token.user.role === 'landlord' || this.token.user.role === 'landlordTenant') {
        return !this.loggedInUserInfo.approved
      }
      return false
    },
    email () {
      return `https://api.adorable.io/avatars/201/${this.token.user.email}.png`
    },
    pages () {
      const role = this.token.user.role
      const navPermissions = {
        superU: 'superUser',
        admin: 'adminUser',
        landlord: 'landlordUser',
        landlordTenant: 'landlordTenantUser',
        tenant: 'tenantUser'
      }
      const mappedRouter = navPermissions[role]
      return mappedRoutePermissions[mappedRouter]
    }
  },
  methods: {
    setPageTitle (page) {
      this.$emit('changePageTitle', page.title)
    }
  },
  created () {
    this.$store.dispatch('configs/getLoggedInUserInfo')
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/navigation';
</style>
