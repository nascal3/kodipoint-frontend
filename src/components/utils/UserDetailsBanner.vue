<template>
  <v-card class="details-container">
    <v-row no-gutters>
      <v-col class="left-section" cols="12" sm="7">
        <v-row class="left-section-info">
          <div class="left-section-info__avatar">
            <div class="picture-border d-flex justify-center align-center">
              <v-avatar v-if="userInfo.name">
                <v-img :src="imageSource(userInfo)"></v-img>
              </v-avatar>
            </div>
            <v-btn class="edit-fab-btn mx-2" @click="openEditDialog()" fab small>
              <v-icon color="primary">mdi-pencil</v-icon>
            </v-btn>
          </div>
          <div class="left-section-info__details">
            <div class="info-section d-flex flex-column justify-center align-start">
              <div class="user-name">{{userInfo.name}}</div>
              <div class="user-email">{{userInfo.email}}</div>
              <div class="user-phone">{{userInfo.phone}}</div>
            </div>
          </div>
        </v-row>
      </v-col>
      <v-col class="right-section" cols="12" sm="5">
        <manage-tenant v-if="isTenantPage" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import ManageTenant from '@/components/tenants/ManageTenant'
import userProfileAvatar from '@/mixins/userProfileAvatar'
import { mapGetters } from 'vuex'

export default {
  name: 'LandlordsDetails',
  mixins: [userProfileAvatar],
  components: {
    ManageTenant
  },
  data: () => ({
    userInfo: {}
  }),
  computed: {
    ...mapGetters({
      landlordSelected: ['landlord/selectedLandlord'],
      tenantSelected: ['tenants/selectedTenant']
    }),
    isTenantPage () {
      return this.$router.currentRoute.name === 'tenants'
    }
  },
  watch: {
    landlordSelected (newValue) {
      this.userInfo = newValue
    },
    tenantSelected (newValue) {
      this.userInfo = newValue
    }
  },
  methods: {
    openEditDialog () {
      this.$emit('openEditDialog', this.userInfo)
    }
  },
  created () {
    this.userInfo = !this.isTenantPage
      ? this.landlordSelected
      : this.tenantSelected
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/components/userDetailsBanner';
</style>
