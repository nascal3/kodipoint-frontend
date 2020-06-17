<template>
    <v-card>
        <v-row>
            <v-col cols="12">
                <div class="picture-section d-flex justify-center">
                    <v-avatar color="secondary">
                        <v-img :src="imageSource(userInfo.avatar)"></v-img>
                    </v-avatar>
                </div>
                <div class="user-name">
                    {{userInfo.name}}
                </div>
                <div class="user-role">
                    {{role}}
                </div>
                <div class="status-chip d-flex justify-center">
                    <v-chip
                        class="ma-2"
                        :color=color
                        text-color="white"
                    >
                        <v-avatar left>
                            <v-icon>{{icon}}</v-icon>
                        </v-avatar>
                        {{statusMessage}}
                    </v-chip>
                </div>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row no-gutters>
            <v-col class="completion-rate" cols="12">
                <div class="completion-rate-title">
                    <span>Profile completion</span>
                    <span class="float-right">{{profileCompletionValue}} %</span>
                </div>
                <v-progress-linear
                    v-model="profileCompletionValue"
                    :color=progressBarColor
                ></v-progress-linear>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import userProfileAvatar from '@/mixins/userProfileAvatar'
import { mapGetters } from 'vuex'

export default {
  name: 'UserInfo',
  mixins: [userProfileAvatar],
  props: {
    userInfo: {
      type: Object,
      required: true
    },
    tokenData: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    color: 'error',
    icon: 'error',
    statusMessage: 'Not approved',
    profileCompletionValue: 30
  }),
  watch: {
    userInfo (newValue) {
      this.setApprovedStatus(newValue)
      if (this.tokenData.user.role === 'landlord' || this.tokenData.user.role === 'landlordTenant') {
        if (newValue.approved) {
          this.color = 'success'
          this.icon = 'mdi-checkbox-marked-circle'
          this.statusMessage = 'Approved'
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      loggedInUserInfo: ['configs/loggedInUserInfo']
    }),
    role () {
      const role = this.tokenData.user.role
      const matchedRole = {
        landlordTenant: 'Landlord & Tenant',
        landlord: 'Landlord',
        admin: 'System Administrator',
        superU: 'Super User',
        tenant: 'Tenant'
      }
      return matchedRole[role]
    },
    progressBarColor () {
      return this.profileCompletionValue >= 100 ? 'success' : 'info'
    }
  },
  methods: {
    setApprovedStatus (userData) {
      if (this.tokenData.user.role === 'landlord' || this.tokenData.user.role === 'landlordTenant') {
        if (userData.approved) {
          this.color = 'success'
          this.icon = 'mdi-checkbox-marked-circle'
          this.statusMessage = 'Approved'
        }
      }
    }
  },
  mounted () {
    this.setApprovedStatus(this.userInfo)
  }

}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/userInfo';
</style>
