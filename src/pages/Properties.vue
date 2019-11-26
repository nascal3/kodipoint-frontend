<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <property-table></property-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PropertyTable from '@/components/properties/PropertyTable'
export default {
  data: () => ({

  }),
  components: {
    PropertyTable
  }

}
</script>

<style lang="scss" scoped>

</style>
