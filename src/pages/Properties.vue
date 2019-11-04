<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4">
        <add-property></add-property>
      </v-col>
      <v-col cols="12" md="8">
        <edit-property></edit-property>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddProperty from '@/components/properties/AddProperty'
import EditProperty from '@/components/properties/EditProperty'
export default {
  data: () => ({

  }),
  components: {
    AddProperty,
    EditProperty
  }

}
</script>

<style lang="scss" scoped>

</style>
