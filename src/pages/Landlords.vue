<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="2">
        <landlord-list class="landlord-list" @selectedLandlord="getSelectedLandlord"></landlord-list>
      </v-col>
      <v-col cols="12" sm="10" v-if="showSection">
<!--        <landlord-table class="landlord-table-card" @selectedLandlord="getSelectedLandlord"></landlord-table>-->
        <property-table :landlordSelected="selected"></property-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PropertyTable from '@/components/properties/PropertyTable'
// import LandlordTable from '@/components/landlords/LandlordsTable'
import LandlordList from '@/components/landlords/LandlordList'

export default {
  name: 'Landlords',
  data: () => ({
    selected: {}
  }),
  components: {
    // LandlordTable,
    PropertyTable,
    LandlordList
  },
  computed: {
    showSection () {
      return Object.keys(this.selected).length
    }
  },
  methods: {
    getSelectedLandlord (landlord) {
      this.selected = landlord
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/pages/landlords';
</style>
