<template>
    <v-card>
        <v-row>
            <v-col cols="12">
                <div class="picture-section d-flex justify-center">
                    <v-avatar>
                        <v-img :src="imageSource(userInfo)"></v-img>
                    </v-avatar>
                </div>
                <div class="user-name">
                    {{userInfo.name}}
                </div>
                <div class="user-role">
                    {{roleName}}
                </div>
                <div class="status-chip d-flex justify-center" v-if="isLandlordRole">
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
        <section v-if="!userInfo.approved && isLandlordRole">
            <v-divider></v-divider>
            <v-row no-gutters>
                <v-col class="completion-rate" cols="12">
                    <div class="completion-rate-title d-flex justify-center">
                        <span>Please complete your profile to get approved</span>
                    </div>
                </v-col>
            </v-row>
            <!--        <v-row no-gutters>-->
            <!--            <v-col class="completion-rate" cols="12">-->
            <!--                <div class="completion-rate-title">-->
            <!--                    <span>Profile completion</span>-->
            <!--                    <span class="float-right">{{profileCompletionValue}} %</span>-->
            <!--                </div>-->
            <!--                <v-progress-linear-->
            <!--                    v-model="profileCompletionValue"-->
            <!--                    :color=progressBarColor-->
            <!--                ></v-progress-linear>-->
            <!--            </v-col>-->
            <!--        </v-row>-->
        </section>
    </v-card>
</template>

<script>
import userProfileAvatar from '@/mixins/userProfileAvatar'
import formatRoleName from '@/mixins/formatRoleName'

export default {
  name: 'UserInfo',
  mixins: [userProfileAvatar, formatRoleName],
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
    profileCompletionValue: 50
  }),
  watch: {
    userInfo (newValue) {
      this.setApprovedStatus(newValue)
      if (this.isLandlordRole) {
        if (newValue.approved) {
          this.color = 'success'
          this.icon = 'mdi-checkbox-marked-circle'
          this.statusMessage = 'Approved'
        }
      }
    }
  },
  computed: {
    roleName () {
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
    isLandlordRole () {
      return this.tokenData.user.role === 'landlord' || this.tokenData.user.role === 'landlordTenant'
    },
    progressBarColor () {
      return this.profileCompletionValue >= 100 ? 'success' : 'primary'
    }
  },
  methods: {
    setApprovedStatus () {
      if (this.isLandlordRole) {
        if (this.userInfo.approved) {
          this.color = 'success'
          this.icon = 'mdi-checkbox-marked-circle'
          this.statusMessage = 'Approved'
        }
      }
    }
  },
  mounted () {
    this.setApprovedStatus()
  }

}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/userInfo';
</style>
