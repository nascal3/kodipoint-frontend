<template>
    <section>
        <div class="text--disabled" v-if="noSearchResultsFound">
            <v-progress-linear
                v-if="isSearching"
                indeterminate
                color="primary"
            ></v-progress-linear>
            {{ isSearching ? 'Searching property...' : 'No property results found' }}
        </div>

        <dynamic-select
            v-model="propertySelect"
            :options="allProperties"
            @search="searchProperty"
            option-value="id"
            option-text="property_name"
            placeholder="Select or search property"
            @input="selectedProperty"
        />
        <infinite-loading
            class="selectInfiniteLoader"
            :identifier="infiniteCount"
            @infinite="getLandlordProperties"
        />
        <transition name="fade">
            <div class="no-property-error" v-if="showError">
                Landlord has no properties.
            </div>
        </transition>
    </section>
</template>

<script>
import DynamicSelect from 'vue-dynamic-select'
import InfiniteLoading from 'vue-infinite-loading'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DynamicPropertiesSelect',
  props: {
    user_id: {
      type: Number,
      default: 0,
      required: true
    }
  },
  components: {
    DynamicSelect,
    InfiniteLoading
  },
  data: () => ({
    propertySelect: {},
    isSearching: false,
    searchPropertyName: '',
    infiniteCount: +new Date(),
    currentUserId: 0
  }),
  computed: {
    ...mapGetters('property', {
      properties: 'properties',
      propertySearchResults: 'propertySearchResults',
      noSearchResults: 'noSearchResults'
    }),
    allProperties () {
      return this.searchPropertyName.length ? this.propertySearchResults : this.properties
    },
    hideLoadMessage () {
      return !this.searchPropertyName.length
    },
    noSearchResultsFound () {
      return this.searchPropertyName.length && !this.propertySearchResults.length
    },
    showError () {
      return this.user_id !== 0 && !this.searchPropertyName.length && !this.allProperties.length
    }
  },
  watch: {
    user_id (newUserId) {
      this.resetPropertiesSelectOptions(newUserId)
    },
    searchPropertyName (searchTerm) {
      if (!searchTerm.length) {
        this.$store.commit('property/RESET_SEARCH_PROPERTIES')
      }
    },
    noSearchResults () {
      this.isSearching = !this.noSearchResults
    }
  },
  methods: {
    ...mapActions('property', {
      getProperties: 'getProperties',
      searchProperties: 'searchProperties'
    }),
    resetPropertiesSelectOptions (newUserId) {
      this.propertySelect = {}
      this.$store.commit('property/RESET_PROPERTIES')
      this.currentUserId = newUserId
      this.infiniteCount += 1
    },
    getLandlordProperties ($event) {
      const payload = {
        user_id: this.currentUserId
      }
      this.getProperties({ ...$event, ...payload })
    },
    searchProperty (inputText) {
      this.searchPropertyName = inputText
      if (inputText === null) this.searchPropertyName = ''
      const payload = {
        'property_name': this.searchPropertyName.trim(),
        'user_id': this.currentUserId
      }
      if (this.searchPropertyName.length) {
        this.isSearching = true
        this.searchProperties(payload)
      }
    },
    selectedProperty () {
      this.$emit('propertySelect', this.propertySelect)
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/components/dynamicSelect';
</style>
