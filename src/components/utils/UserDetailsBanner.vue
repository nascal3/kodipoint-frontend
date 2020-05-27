<template>
  <v-card class="details-container">
    <v-row no-gutters>
      <v-col class="left-section" cols="12" sm="4">
        <v-row no-gutters>
          <v-col cols="12" sm="5">
            <div class="picture-border d-flex justify-center align-center">
              <v-avatar v-if="userInfo.name" color="primary">
                <v-img :src="imageSource(userInfo.avatar)"></v-img>
              </v-avatar>
            </div>
            <v-btn class="edit-fab-btn mx-2" @click="openEditDialog()" fab small>
              <v-icon color="primary">mdi-pencil</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="7">
            <div class="info-section d-flex flex-column justify-center align-start">
              <div class="user-name">{{userInfo.name}}</div>
              <div class="user-email">{{userInfo.email}}</div>
              <div class="user-phone">{{userInfo.phone}}</div>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="right-section" cols="12" sm="8">
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LandlordsDetails',
  data: () => ({
    placeholderImage: require(`@/assets/images/avatar.jpg`),
    userInfo: {}
  }),
  computed: {
    ...mapGetters({
      landlordSelected: ['landlord/selectedLandlord'],
      tenantSelected: ['tenants/selectedTenant']
    })
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
    },
    imageSource (imagePath) {
      if (!imagePath) return this.placeholderImage
      const baseURL = process.env.BASE_URL
      return `${baseURL}/file${imagePath}`
    }
  },
  created () {
    this.$router.currentRoute.name === 'landlords'
      ? this.userInfo = this.landlordSelected
      : this.userInfo = this.tenantSelected
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/components/userDetailsBanner';
</style>
