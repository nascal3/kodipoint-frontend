<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <property-table />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PropertyTable from '@/components/properties/PropertyTable'
import { mapGetters } from 'vuex'

export default {
  data: () => ({

  }),
  components: {
    PropertyTable
  },
  computed: {
    ...mapGetters({
      token: ['auth/token'],
      userInfo: ['configs/loggedInUserInfo']
    })
  },
  methods: {
    checkApproval () {
      if (this.token.user.role === 'landlord' || this.token.user.role === 'landlordTenant') {
        if (this.userInfo.approved) this.$router.push('/profile')
      }
    }
  },
  created () {
    this.checkApproval()
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/pages/properties';
</style>
