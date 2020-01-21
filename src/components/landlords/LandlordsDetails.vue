<template>
  <v-card class="details-container">
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-avatar v-if="landlordSelected.name" color="primary">
          <v-img :src="imageSource(landlordSelected.avatar, true)"></v-img>
        </v-avatar>
        <span class="landlord-name">{{landlordSelected.name}}</span>
      </v-col>
      <v-col cols="12" md="6">

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
