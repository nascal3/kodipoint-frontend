<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <landlord-table class="landlord-table-card" @selectedLandlord="getSelectedLandlord"></landlord-table>
        <property-table :landlordSelected="selected"></property-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PropertyTable from '@/components/properties/PropertyTable'
import LandlordTable from '@/components/landlords/LandlordsTable'

export default {
  name: 'Landlords',
  data: () => ({
    selected: {}
  }),
  components: {
    LandlordTable,
    PropertyTable
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
