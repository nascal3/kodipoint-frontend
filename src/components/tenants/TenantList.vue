<template>
 <v-card class="list-container">
   <div class="add-btn-container d-flex justify-end align-center">
     <v-btn
       class=" btn-text "
       color="primary"
       block
       @click="openAddDialog()"
     >
       <v-icon left>mdi-plus</v-icon>
       Add tenant
     </v-btn>
   </div>
   <section class="search-list">
    <v-row no-gutters>
      <div class="search-item">
        <v-text-field
          v-model="searchTenantName"
          placeholder="Search tenant"
          prepend-icon="search"
          @input="searchTenant"
        ></v-text-field>
      </div>
    </v-row>
   </section>

   <section class="items-list">
     <v-list>
       <v-list-item-group color="primary">
         <v-list-item
           v-for="tenant in allTenants"
           @click="getTenant(tenant)"
           :key="tenant.id"
           :class="{'v-list-item--active': tenant.id === selectedTenant.id }"
         >
           <v-list-item-icon>
             <v-avatar color="primary">
               <v-img :src="imageSource(tenant.avatar)"></v-img>
             </v-avatar>
           </v-list-item-icon>
           <v-list-item-content>
             <v-list-item-title v-text="tenant.name"></v-list-item-title>
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
           @infinite="getAllTenants"
         ></infinite-loading>
       </v-list-item-group>
     </v-list>
   </section>
 </v-card>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TenantList',
  props: {
    reloadValue: {
      type: Number
    }
  },
  components: {
    InfiniteLoading
  },
  data: () => ({
    infiniteId: +new Date(),
    searchTenantName: '',
    dialog: false,
    edit: false,
    isSearching: false,
    placeholderImage: require(`@/assets/images/avatar.jpg`),
    landlordInfo: null,
    selectedID: null
  }),
  computed: {
    ...mapGetters('tenants', {
      showLoader: 'showLoader',
      showErrorState: 'showErrorState',
      tenants: 'tenants',
      tenantSearchResults: 'tenantSearchResults',
      noSearchResults: 'noSearchResults',
      selectedTenant: 'selectedTenant'
    }),
    allTenants () {
      return this.searchTenantName.length ? this.tenantSearchResults : this.tenants
    },
    hideLoadMessage () {
      return this.searchTenantName.length <= 0
    },
    noSearchResultsFound () {
      return this.searchTenantName.length && !this.tenantSearchResults.length
    }
  },
  watch: {
    reloadValue (newVal) {
      if ((this.infiniteId !== newVal)) this.infiniteId += 1
    },
    searchTenantName (newValue) {
      if (!newValue.length) {
        this.$store.commit('tenants/RESET_TENANTS')
      }
    },
    noSearchResults () {
      this.isSearching = !this.noSearchResults
    }
  },
  methods: {
    ...mapActions('tenants', {
      getTenants: 'getTenants',
      searchTenants: 'searchTenants',
      setSelectedTenant: 'setSelectedTenant'
    }),
    getTenant (tenant) {
      this.selectedID = tenant.id
      this.setSelectedTenant(tenant)
    },
    openAddDialog () {
      this.$emit('openAddDialog', {})
    },
    closeModal (value) {
      this.dialog = value.openState
      if (value.formSubmitted) this.infiniteId += 1
    },
    getAllTenants ($event) {
      this.getTenants({ ...$event })
    },
    imageSource (imagePath) {
      if (!imagePath) return this.placeholderImage
      const baseURL = process.env.BASE_URL
      return `${baseURL}/file${imagePath}`
    },
    searchTenant () {
      const payload = this.searchTenantName
      if (payload.length) {
        this.isSearching = true
        this.searchTenants(payload)
      }
    }
  },
  beforeDestroy () {
    this.$store.commit('tenants/RESET_TENANTS')
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/components/sideBarItemList';
</style>
