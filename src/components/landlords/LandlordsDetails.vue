<template>
  <v-card class="details-container">
    <v-row no-gutters>
      <v-col class="left-section" cols="12" md="2">
        <div class="picture-border d-flex justify-center align-center">
          <v-avatar v-if="landlordInfo.name" color="primary">
            <v-img :src="imageSource(landlordInfo.avatar, true)"></v-img>
          </v-avatar>
        </div>
        <v-btn class="edit-fab-btn mx-2" @click="openDialog(landlordInfo)" fab small>
          <v-icon color="primary" @click="openDialog(landlordInfo)">mdi-pencil</v-icon>
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

    <v-dialog v-model="dialog">
      <landlord-form @closeModal="closeModal" :edit="edit" :landlordInfo="landlordInfo"></landlord-form>
    </v-dialog>
  </v-card>
</template>

<script>
import LandlordForm from '@/components/landlords/LandlordForm'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'LandlordsTable',
  components: {
    LandlordForm
  },
  data: () => ({
    infiniteId: +new Date(),
    page: 1,
    dialog: false,
    edit: false,
    placeholderImage: require(`@/assets/images/avatar.jpg`),
    landlordInfo: {},
    selectedID: null
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
    ...mapActions('landlord', {
      getLandlords: 'getLandlords',
      searchLandlords: 'searchLandlords',
      setSelectedLandlord: 'setSelectedLandlord',
      resetSelectedLandlord: 'resetSelectedLandlord'
    }),
    openDialog (landlord) {
      Object.keys(landlord).length ? this.edit = true : this.edit = false
      this.dialog = true
    },
    closeModal (value) {
      this.dialog = value.openState
      if (value.formSubmitted) {
        this.resetSelectedLandlord()
        this.$emit('changedDetails', true)
      }
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
