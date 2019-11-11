<template>
  <v-card>
    <v-simple-table fixed-header height="300px">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Property name</th>
          <th class="text-left">Property type</th>
          <th class="text-left">Contact person</th>
          <th class="text-left">Contact phone</th>
          <th class="text-left">LR number</th>
          <th class="text-left">Num of units</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="property in properties">
          <tr :key="property.id">
            <td>{{ property.property_name }}</td>
            <td>{{ property.property_type }}</td>
            <td>{{ property.contact_person }}</td>
            <td>{{ property.phone }}</td>
            <td>{{ property.lr_nos }}</td>
            <td>{{ property.nos_units }}</td>
          </tr>
        </template>
        <tr>
          <td colspan="6">
            <infinite-loading
              :identifier="infiniteId"
              @infinite="getAllProperties"
            >
            </infinite-loading>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EditProperty',
  components: {
    InfiniteLoading
  },
  data: () => ({
    infiniteId: +new Date(),
    page: 1
  }),
  computed: {
    ...mapGetters('property', {
      showLoader: 'showLoader',
      showErrorState: 'showErrorState',
      properties: 'properties'
    })
  },
  methods: {
    ...mapActions('property', {
      getProperties: 'getProperties'
    }),
    getAllProperties ($event) {
      const payload = {
        page: this.page
      }
      this.getProperties({ ...$event, ...payload })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
