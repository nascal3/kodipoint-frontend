<template>
  <v-card>
    <v-card-title class="card-title">Properties</v-card-title>
    <v-card-subtitle class="card-subtitle">View/Edit properties</v-card-subtitle>
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <div class="search-property">
          <v-text-field
              v-model="searchPropertyName"
              placeholder="Search property name"
              prepend-icon="search"
              @input="searchProperty"
          ></v-text-field>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div class="property-btn-container d-flex justify-end align-center">
          <v-btn
            class=" btn-text "
            color="secondary"
            @click="openDialog()"
          >
            <v-icon left>mdi-plus</v-icon>
              Add property
            </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-simple-table class="property-table" fixed-header>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Property name</th>
          <th class="text-left">Property type</th>
          <th class="text-left">Contact person</th>
          <th class="text-left">Contact phone</th>
          <th class="text-left">LR number</th>
          <th class="text-left">Num of units</th>
          <th class="text-left">Property Image</th>
          <th class="text-center">Property services</th>
          <th>Edit</th>
        </tr>
        </thead>
        <tbody>
          <template v-for="property in allProperties">
            <tr :key="property.id">
              <td>{{ property.property_name }}</td>
              <td>{{ property.property_type }}</td>
              <td>{{ property.contact_person }}</td>
              <td>{{ property.phone }}</td>
              <td>{{ property.lr_nos }}</td>
              <td>{{ property.nos_units }}</td>
              <td>
                <v-img :src="imageSource(property.property_img)"></v-img>
              </td>
              <td>
                <v-chip
                  class="ma-2"
                  color="secondary"
                  outlined
                  v-for="(service, index) in servicesPills(property)"
                  :key="index"
                >
                  {{service}}
                </v-chip>
              </td>
              <td>
                <v-icon color="primary" @click="openDialog(property)">mdi-pencil</v-icon>
              </td>
            </tr>
          </template>
          <tr v-if="noSearchResultsFound">
            <td class="text-center" colspan="9">
              <span class="text--disabled">
                {{ isSearching ? 'Searching property...' : 'No results found' }}
              </span>
            </td>
          </tr>
          <tr v-if="hideLoadMessage && !showErrorState">
            <td colspan="9">
              <infinite-loading
                :identifier="infiniteId"
                @infinite="getAllProperties"
              >
              </infinite-loading>
            </td>
          </tr>
          <tr v-if="showErrorState">
            <td class="text-center" colspan="9">
              <span class="text--disabled">
                Oops! An error occurred :(
              </span>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-dialog v-model="dialog">
      <property-form @closeModal="closeModal" :edit="edit" :propertyInfo="propertyInfo"></property-form>
    </v-dialog>
  </v-card>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import PropertyForm from '@/components/properties/PropertyForm'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EditProperty',
  components: {
    InfiniteLoading,
    PropertyForm
  },
  data: () => ({
    infiniteId: +new Date(),
    page: 1,
    searchPropertyName: '',
    dialog: false,
    edit: false,
    isSearching: false,
    placeholderImage: require(`@/assets/images/noImage.jpg`),
    propertyInfo: null
  }),
  computed: {
    ...mapGetters('property', {
      showLoader: 'showLoader',
      showErrorState: 'showErrorState',
      properties: 'properties',
      propertySearchResults: 'propertySearchResults',
      noSearchResults: 'noSearchResults'
    }),
    allProperties () {
      return this.searchPropertyName.length ? this.propertySearchResults : this.properties
    },
    hideLoadMessage () {
      return this.searchPropertyName.length <= 0
    },
    noSearchResultsFound () {
      return this.searchPropertyName.length && !this.propertySearchResults.length
    }
  },
  watch: {
    searchPropertyName (newValue) {
      if (!newValue.length) {
        this.$store.commit('property/RESET_PROPERTIES')
      }
    },
    noSearchResults () {
      console.log('searching', this.isSearching, 'no results', this.noSearchResults)
      this.isSearching = !this.noSearchResults
    }
  },
  methods: {
    ...mapActions('property', {
      getProperties: 'getProperties',
      searchProperties: 'searchProperties'
    }),
    openDialog (property) {
      if (property) {
        this.edit = true
        this.propertyInfo = property
      } else if (!property) {
        this.edit = false
        this.propertyInfo = null
      }
      this.dialog = true
    },
    closeModal (value) {
      this.dialog = value.openState
      if (value.formSubmitted) this.infiniteId += 1
    },
    servicesPills (property) {
      const serviceString = property.property_services
      return serviceString.split(',')
    },
    getAllProperties ($event) {
      const payload = {
        page: this.page
      }
      this.getProperties({ ...$event, ...payload })
    },
    imageSource (imagePath) {
      if (!imagePath) return this.placeholderImage
      const baseURL = process.env.BASE_URL
      return `${baseURL}/file${imagePath}`
    },
    searchProperty () {
      const payload = this.searchPropertyName
      if (payload.length) {
        this.isSearching = true
        this.searchProperties(payload)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/layout/propertyTable';
</style>
