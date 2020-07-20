<template>
  <v-card class="property-container" :class="{'place-below-banner': landlordPage === true }">
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-card-title class="title">Properties</v-card-title>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col class="search-section" cols="12" md="6">
        <div class="search-property">
          <v-text-field
              v-model="searchPropertyName"
              placeholder="Search property name"
              prepend-icon="search"
              @input="searchProperty"
          ></v-text-field>
        </div>
      </v-col>
      <v-col class="add-button-section" cols="12" md="6">
        <div class="property-btn-container d-flex justify-end align-center">
          <v-btn
            class=" btn-text "
            color="secondary"
            @click="openPropertyDialog()"
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
              <td @click="showTenantsModal(property.id, property.property_name)">{{ property.property_name }}</td>
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
                <v-icon color="primary" @click="openPropertyDialog(property)">mdi-pencil</v-icon>
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

    <v-dialog v-model="propertyDialog">
      <property-form
        @closePropertyModal="closePropertyModal"
        :edit="edit"
        :propertyInfo="propertyInfo"
        :landlordInfo="landlordSelected"
      />
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
  props: {
    landlordSelected: {
      type: Object
    }
  },
  data: () => ({
    infiniteId: +new Date(),
    searchPropertyName: '',
    propertyDialog: false,
    edit: false,
    isSearching: false,
    placeholderImage: require(`@/assets/images/noImage.jpg`),
    placeholderImage2: require(`@/assets/images/avatar.jpg`),
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
    },
    landlordPage () {
      return this.$router.currentRoute.name === 'landlords'
    }
  },
  watch: {
    searchPropertyName (newValue) {
      if (!newValue.length) {
        this.$store.commit('property/RESET_PROPERTIES')
      }
    },
    noSearchResults () {
      this.isSearching = !this.noSearchResults
    },
    landlordSelected () {
      this.$store.commit('property/RESET_PROPERTIES')
      this.infiniteId += 1
    }
  },
  methods: {
    ...mapActions('property', {
      getProperties: 'getProperties',
      searchProperties: 'searchProperties',
      fetchTenantsInProperty: 'fetchTenantsInProperty'
    }),
    async showTenantsModal (propertyID, propertyName) {
      this.$store.commit('property/SHOW_PROPERTY_TENANTS', propertyName)
      const param = { 'property_id': propertyID }
      await this.fetchTenantsInProperty(param)
    },
    openPropertyDialog (property) {
      if (property) {
        this.edit = true
        this.propertyInfo = property
      } else if (!property) {
        this.edit = false
        this.propertyInfo = null
      }
      this.propertyDialog = true
    },
    closePropertyModal (value) {
      this.propertyDialog = value.openState
      if (value.formSubmitted) this.infiniteId += 1
    },
    servicesPills (property) {
      const serviceString = property.property_services
      return serviceString.split(',')
    },
    getAllProperties ($event) {
      const payload = {
        user_id: this.landlordSelected ? this.landlordSelected.user_id : 0
      }
      this.getProperties({ ...$event, ...payload })
    },
    imageSource (imagePath, avatar = false) {
      if (!imagePath && !avatar) return this.placeholderImage
      if (!imagePath && avatar) return this.placeholderImage2
      const baseURL = process.env.BASE_URL
      return `${baseURL}/file${imagePath}`
    },
    searchProperty () {
      const payload = {
        'property_name': this.searchPropertyName.trim(),
        'user_id': this.landlordSelected ? this.landlordSelected.user_id : null
      }
      if (this.searchPropertyName.length) {
        this.isSearching = true
        this.searchProperties(payload)
      }
    }
  },
  beforeDestroy () {
    this.$store.commit('property/RESET_PROPERTIES')
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/layout/propertyTable';
</style>
