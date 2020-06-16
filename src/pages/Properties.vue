<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <property-table />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PropertyTable from '@/components/properties/PropertyTable'
import checkLandlordApproval from '@/mixins/checkLandlordApproval'

export default {
  name: 'Properties',
  mixins: [checkLandlordApproval],
  components: {
    PropertyTable
  },
  created () {
    this.checkLandlordApproval()
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/pages/properties';
</style>
