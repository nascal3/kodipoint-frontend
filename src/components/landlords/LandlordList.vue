<template>
 <v-card class="list-container">
   <div class="add-landlord-btn-container d-flex justify-end align-center">
     <v-btn
       class=" btn-text "
       color="primary"
       block
       @click="openDialog()"
     >
       <v-icon left>mdi-plus</v-icon>
       Add landlord
     </v-btn>
   </div>
   <section class="search-list">
    <v-row no-gutters>
      <div class="search-landlord">
        <v-text-field
          v-model="searchLandlordName"
          placeholder="Search landlord"
          prepend-icon="search"
          @input="searchLandlord"
        ></v-text-field>
      </div>
    </v-row>
   </section>

   <section class="landlord-list">
     <v-list>
       <v-list-item-group color="primary">
         <v-list-item
           v-for="landlord in allLandlords"
           @click="getLandlord(landlord)"
           :key="landlord.landlord_id">
           <v-list-item-icon>
             <v-avatar color="primary">
               <v-img :src="imageSource(landlord.avatar)"></v-img>
             </v-avatar>
           </v-list-item-icon>
           <v-list-item-content>
             <v-list-item-title v-text="landlord.name"></v-list-item-title>
           </v-list-item-content>
         </v-list-item>
         <v-list-item v-if="showErrorState">
           <v-list-item-content>
             <v-list-item-title class="text--disabled">
               Oops! An error occurred :(
             </v-list-item-title>
           </v-list-item-content>
         </v-list-item>
         <infinite-loading
           v-if="hideLoadMessage && !showErrorState"
           :identifier="infiniteId"
           @infinite="getAllLandlords"
         ></infinite-loading>
       </v-list-item-group>
     </v-list>
   </section>

   <v-dialog v-model="dialog">
     <landlord-form @closeModal="closeModal" :edit="edit" :landlordInfo="landlordInfo"></landlord-form>
   </v-dialog>
 </v-card>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import LandlordForm from '@/components/landlords/LandlordForm'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'LandlordList',
  components: {
    InfiniteLoading,
    LandlordForm
  },
  data: () => ({
    infiniteId: +new Date(),
    page: 1,
    searchLandlordName: '',
    dialog: false,
    edit: false,
    isSearching: false,
    placeholderImage: require(`@/assets/images/avatar.jpg`),
    landlordInfo: null,
    selectedID: null
  }),
  computed: {
    ...mapGetters('landlord', {
      showLoader: 'showLoader',
      showErrorState: 'showErrorState',
      landlords: 'landlords',
      landlordSearchResults: 'landlordSearchResults',
      noSearchResults: 'noSearchResults'
    }),
    allLandlords () {
      return this.searchLandlordName.length ? this.landlordSearchResults : this.landlords
    },
    hideLoadMessage () {
      return this.searchLandlordName.length <= 0
    },
    noSearchResultsFound () {
      return this.searchLandlordName.length && !this.landlordSearchResults.length
    }
  },
  watch: {
    searchLandlordName (newValue) {
      if (!newValue.length) {
        this.$store.commit('landlord/RESET_LANDLORDS')
      }
    },
    noSearchResults () {
      this.isSearching = !this.noSearchResults
    }
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
      console.log('>>>', value)
      this.dialog = value.openState
      if (value.formSubmitted) this.infiniteId += 1
    },
    getAllLandlords ($event) {
      const payload = {
        page: this.page
      }
      this.getLandlords({ ...$event, ...payload })
    },
    imageSource (imagePath) {
      if (!imagePath) return this.placeholderImage
      const baseURL = process.env.BASE_URL
      return `${baseURL}/file${imagePath}`
    },
    searchLandlord () {
      const payload = this.searchLandlordName
      if (payload.length) {
        this.isSearching = true
        this.searchLandlords(payload)
      }
    }
  },
  beforeDestroy () {
    this.$store.commit('landlord/RESET_LANDLORDS')
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/layout/landlordList';
</style>
