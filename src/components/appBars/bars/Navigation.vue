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
            <v-img :src="kodiPointLightLogo"></v-img>
        </v-list-item>
        <v-list shaped dense>
            <v-list-item
                v-for="page in pages"
                :key="page.title"
                router :to="page.route"
                link
            >
                <v-list-item-icon>
                    <v-icon>{{ page.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="menu-items-text">{{ page.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-spacer></v-spacer>

        <v-footer absolute>
            <v-col class="text-center" cols="12">
                <router-link to="#">Terms & Conditions</router-link>
                <a target="_blank" href="/privacy" @click.stop>
                    Privacy Policy
                </a> <br>
                ©{{ new Date().getFullYear() }} KodiPoint
            </v-col>
        </v-footer>
    </v-navigation-drawer>
</template>

<script>
import { mappedRoutePermissions } from '@/config'
import { mapGetters } from 'vuex'

export default {
  name: 'Navigation',
  data: () => ({
    drawer: true,
    bg: require('@/assets/images/menu_bg.jpg'),
    kodiPointLightLogo: require('@/assets/images/kodipoint_logo_light.png')
  }),
  computed: {
    ...mapGetters({
      user: ['auth/user'],
      token: ['auth/token'],
      loggedInUserInfo: ['configs/loggedInUserInfo']
    }),
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
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/navigation';
</style>
