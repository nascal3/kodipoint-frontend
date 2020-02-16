<template>
  <v-card class="details-container">
    <v-row no-gutters>
      <v-col class="left-section" cols="12" md="2">
        <div class="picture-border d-flex justify-center align-center">
          <v-avatar v-if="landlordInfo.name" color="primary">
            <v-img :src="imageSource(landlordInfo.avatar, true)"></v-img>
          </v-avatar>
        </div>
        <v-btn class="edit-fab-btn mx-2" @click="openEditDialog()" fab small>
          <v-icon color="primary">mdi-pencil</v-icon>
        </v-btn>
      </v-col>
      <v-col class="right-section" cols="12" md="10">
        <div class="info-section d-flex flex-column justify-center align-start">
          <div class="landlord-name">{{landlordInfo.name}}</div>
          <div class="landlord-email">{{landlordInfo.email}}</div>
          <div class="landlord-phone">{{landlordInfo.phone}}</div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LandlordsTable',
  data: () => ({
    placeholderImage: require(`@/assets/images/avatar.jpg`),
    landlordInfo: {}
  }),
  computed: {
    ...mapGetters('landlord', {
      showLoader: 'showLoader',
      showErrorState: 'showErrorState',
      landlordSelected: 'selectedLandlord'
    })
  },
  watch: {
    landlordSelected (newValue) {
      this.landlordInfo = newValue
    }
  },
  methods: {
    openEditDialog () {
      this.$emit('openEditDialog', this.landlordSelected)
    },
    imageSource (imagePath) {
      if (!imagePath) return this.placeholderImage
      const baseURL = process.env.BASE_URL
      return `${baseURL}/file${imagePath}`
    }
  },
  created () {
    this.landlordInfo = this.landlordSelected
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/layout/landlordsDetails';
</style>
