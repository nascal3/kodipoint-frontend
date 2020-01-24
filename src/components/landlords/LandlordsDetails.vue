<template>
  <v-card class="details-container">
    <v-row no-gutters>
      <v-col class="left-section" cols="12" md="2">
        <div class="picture-border d-flex justify-center align-center">
          <v-avatar v-if="landlordSelected.name" color="primary">
            <v-img :src="imageSource(landlordSelected.avatar, true)"></v-img>
          </v-avatar>
        </div>
        <v-btn class="mx-2" fab small>
          <v-icon color="primary" @click="openDialog(landlordSelected)">mdi-pencil</v-icon>
        </v-btn>
      </v-col>
      <v-col class="right-section" cols="12" md="10">
        <div class="info-section d-flex flex-column justify-center align-start">
          <div class="landlord-name">{{landlordSelected.name}}</div>
          <div class="landlord-email">{{landlordSelected.email}}</div>
          <div class="landlord-phone">{{landlordSelected.phone}}</div>
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
  props: {
    landlordSelected: {
      type: Object
    }
  },
  data: () => ({
    infiniteId: +new Date(),
    page: 1,
    dialog: false,
    edit: false,
    placeholderImage: require(`@/assets/images/avatar.jpg`),
    landlordInfo: null,
    selectedID: null
  }),
  computed: {
    ...mapGetters('landlord', {
      showLoader: 'showLoader',
      showErrorState: 'showErrorState'
    })
  },
  methods: {
    ...mapActions('landlord', {
      getLandlords: 'getLandlords',
      searchLandlords: 'searchLandlords'
    }),
    getLandlord (landlord) {
      this.selectedID = landlord.user_id
      this.$emit('selectedLandlord', landlord)
    },
    openDialog (landlord) {
      if (landlord) {
        this.edit = true
        this.landlordInfo = landlord
      } else if (!landlord) {
        this.edit = false
        this.landlordInfo = null
      }
      this.dialog = true
    },
    closeModal (value) {
      this.dialog = value.openState
      if (value.formSubmitted) this.infiniteId += 1
    },
    imageSource (imagePath) {
      if (!imagePath) return this.placeholderImage
      const baseURL = process.env.BASE_URL
      return `${baseURL}/file${imagePath}`
    }
  },
  beforeDestroy () {
    this.$store.commit('landlord/RESET_LANDLORDS')
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/layout/landlordsDetails';
</style>
