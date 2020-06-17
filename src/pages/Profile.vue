<template>
    <v-container fluid>
        <v-alert
            v-if="approved"
            dense
            prominent
            type="error"
        >
            Your account is not yet approved for use!
        </v-alert>
        <v-row>
            <v-col cols="12" sm="4">
                <user-info
                    :userInfo="loggedInUserInfo"
                    :tokenData="token"
                />
            </v-col>
            <v-col cols="12" sm="8">
                <profile-form />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ProfileForm from '@/components/profile/ProfileForm'
import UserInfo from '@/components/profile/UserInfo'
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  components: {
    ProfileForm,
    UserInfo
  },
  computed: {
    ...mapGetters({
      token: ['auth/token'],
      loggedInUserInfo: ['configs/loggedInUserInfo']
    }),
    approved () {
      if (this.token.user.role === 'landlord' || this.token.user.role === 'landlordTenant') {
        return !this.loggedInUserInfo.approved
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
