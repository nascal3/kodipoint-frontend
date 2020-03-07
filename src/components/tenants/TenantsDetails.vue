<template>
  <v-card class="details-container">
    <v-row no-gutters>
      <v-col class="left-section">
        <div class="picture-border d-flex justify-center align-center">
          <v-avatar v-if="tenantInfo.name" color="primary">
            <v-img :src="imageSource(tenantInfo.avatar)"></v-img>
          </v-avatar>
        </div>
        <v-btn class="edit-fab-btn mx-2" @click="openEditDialog()" fab small>
          <v-icon color="primary">mdi-pencil</v-icon>
        </v-btn>
      </v-col>
      <v-col class="right-section">
        <div class="info-section d-flex flex-column justify-center align-start">
          <div class="user-name">{{tenantInfo.name}}</div>
          <div class="user-email">{{tenantInfo.email}}</div>
          <div class="user-phone">{{tenantInfo.phone}}</div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TenantsDetails',
  data: () => ({
    placeholderImage: require(`@/assets/images/avatar.jpg`),
    tenantInfo: {}
  }),
  computed: {
    ...mapGetters('tenants', {
      showLoader: 'showLoader',
      showErrorState: 'showErrorState',
      selectedTenant: 'selectedTenant'
    })
  },
  watch: {
    selectedTenant (newValue) {
      this.tenantInfo = newValue
    }
  },
  methods: {
    openEditDialog () {
      this.$emit('openEditDialog', this.selectedTenant)
    },
    imageSource (imagePath) {
      if (!imagePath) return this.placeholderImage
      const baseURL = process.env.BASE_URL
      return `${baseURL}/file${imagePath}`
    }
  },
  created () {
    this.tenantInfo = this.selectedTenant
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/components/userDetailsBanner';
</style>
