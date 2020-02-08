<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="2">
        <landlord-list class="landlord-list" :reloadValue="changed"></landlord-list>
      </v-col>
      <v-col cols="12" sm="10" v-if="showSection">
        <landlord-details class="landlord-table-card" @changedDetails="changedDetails"></landlord-details>
        <property-table :landlordSelected="landlordSelected"></property-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import PropertyTable from '@/components/properties/PropertyTable'
import LandlordDetails from '@/components/landlords/LandlordsDetails'
import LandlordList from '@/components/landlords/LandlordList'

export default {
  name: 'Landlords',
  data: () => ({
    changed: null
  }),
  components: {
    LandlordDetails,
    PropertyTable,
    LandlordList
  },
  computed: {
    ...mapGetters('landlord', {
      landlordSelected: 'selectedLandlord'
    }),
    showSection () {
      return Object.keys(this.landlordSelected).length
    }
  },
  methods: {
    changedDetails (value) {
      if (value) this.changed = +new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/pages/landlords';
</style>
