<template>
    <section>
        <div class="text--disabled" v-if="noSearchResultsFound">
            <v-progress-linear
                v-if="isSearching"
                indeterminate
                color="primary"
            ></v-progress-linear>
            {{ isSearching ? 'Searching landlord..' : 'No landlord results found' }}
        </div>

        <dynamic-select
            v-model="landlordSelect"
            :options="allLandlords"
            @search="searchLandlord"
            option-value="landlord_id"
            option-text="name"
            placeholder="Select or search landlord"
            @input="selectedLandlord"
        />
        <infinite-loading
            class="selectInfiniteLoader"
            :identifier="infiniteId"
            @infinite="getAllLandlords"
        />
    </section>
</template>

<script>
import DynamicSelect from 'vue-dynamic-select'
import InfiniteLoading from 'vue-infinite-loading'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DynamicLandlordSelect',
  components: {
    DynamicSelect,
    InfiniteLoading
  },
  data: () => ({
    landlordSelect: {},
    isSearching: false,
    searchLandlordName: '',
    infiniteId: +new Date()
  }),
  computed: {
    ...mapGetters('landlord', {
      landlords: 'landlords',
      landlordSearchResults: 'landlordSearchResults',
      noSearchResults: 'noSearchResults'
    }),
    allLandlords () {
      return this.searchLandlordName.length ? this.landlordSearchResults : this.landlords
    },
    hideLoadMessage () {
      return !this.searchLandlordName.length
    },
    noSearchResultsFound () {
      return this.searchLandlordName.length && !this.landlordSearchResults.length
    }
  },
  watch: {
    searchLandlordName (searchTerm) {
      if (!searchTerm.length) {
        this.$store.commit('landlord/RESET_SEARCH_LANDLORDS')
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
    getAllLandlords ($event) {
      this.getLandlords({ ...$event })
    },
    searchLandlord (inputText) {
      this.searchLandlordName = inputText
      if (inputText === null) this.searchLandlordName = ''
      const payload = this.searchLandlordName
      if (this.searchLandlordName.length) {
        this.isSearching = true
        this.searchLandlords(payload)
      }
    },
    selectedLandlord () {
      this.$emit('landlordSelect', this.landlordSelect)
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/components/dynamicSelect';
</style>
