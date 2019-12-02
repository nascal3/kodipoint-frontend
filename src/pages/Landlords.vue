<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <landlord-table class="landlord-table-card"></landlord-table>
        <property-table></property-table>
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

  }),
  components: {
    LandlordTable,
    PropertyTable
  }

}
</script>

<style lang="scss" scoped>
  @import 'src/styles/pages/landlords';
</style>
