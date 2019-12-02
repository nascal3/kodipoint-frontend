<template>
  <v-card>
    <v-card-title class="card-title">Landlords</v-card-title>
    <v-card-subtitle class="card-subtitle">View/Edit Landlords</v-card-subtitle>
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <div class="search-property">
          <v-text-field
            v-model="searchLandlordName"
            placeholder="Search by name / national ID"
            prepend-icon="search"
            @input="searchLandlord"
          ></v-text-field>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div class="property-btn-container d-flex justify-end align-center">
          <v-btn
            class=" btn-text "
            color="primary"
            @click="openDialog()"
          >
            <v-icon left>mdi-plus</v-icon>
            Add landlord
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-simple-table class="property-table" fixed-header>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">&nbsp;</th>
          <th class="text-left">Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">Phone number</th>
          <th class="text-left">National ID</th>
          <th class="text-left">KRA Pin</th>
          <th class="text-left">Bank</th>
          <th class="text-left">Bank branch</th>
          <th class="text-left">Acc number</th>
          <th>Edit</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="landlord in allLandlords">
          <tr :key="landlord.landlord_id">
            <td><v-img :src="imageSource(landlord.avatar)"></v-img></td>
            <td>{{ landlord.name }}</td>
            <td>{{ landlord.email }}</td>
            <td>{{ landlord.phone }}</td>
            <td>{{ landlord.national_id }}</td>
            <td>{{ landlord.kra_pin }}</td>
            <td>{{ landlord.bank_name }}</td>
            <td>{{ landlord.bank_branch }}</td>
            <td>{{ landlord.bank_acc }}</td>
            <td>
              <v-icon color="primary" @click="openDialog(landlord)">mdi-pencil</v-icon>
            </td>
          </tr>
        </template>
        <tr v-if="noSearchResultsFound">
          <td class="text-center" colspan="10">
              <span class="text--disabled">
                {{ isSearching ? 'Searching landlord...' : 'No results found' }}
              </span>
          </td>
        </tr>
        <tr v-if="hideLoadMessage && !showErrorState">
          <td colspan="10">
            <infinite-loading
              :identifier="infiniteId"
              @infinite="getAllLandlords"
            >
            </infinite-loading>
          </td>
        </tr>
        <tr v-if="showErrorState">
          <td class="text-center" colspan="10">
              <span class="text--disabled">
                Oops! An error occurred :(
              </span>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>

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
  name: 'LandlordsTable',
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
    landlordInfo: null
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
  @import 'src/styles/layout/landlordsTable';
</style>
