<template>
  <v-card>
    <v-card-title class="card-title">Properties</v-card-title>
    <v-card-subtitle class="card-subtitle">View/Edit properties</v-card-subtitle>
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <div class="search-property">
          <v-text-field
              v-model="searchPropertyName"
              placeholder="Search property"
              prepend-icon="search"
          ></v-text-field>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div class="property-btn-container d-flex justify-end align-center">
          <v-btn
            class=" btn-text "
            color="secondary"
            @click="openDialog()"
          >
            <v-icon left>mdi-plus</v-icon>
              Add property
            </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-simple-table class="property-table" fixed-header>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Property name</th>
          <th class="text-left">Property type</th>
          <th class="text-left">Contact person</th>
          <th class="text-left">Contact phone</th>
          <th class="text-left">LR number</th>
          <th class="text-left">Num of units</th>
          <th class="text-center">Property services</th>
          <th>Edit</th>
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
              <td>
                <v-chip
                  class="ma-2"
                  color="secondary"
                  outlined
                  v-for="(service, index) in servicesPills(property)"
                  :key="index"
                >
                  {{service}}
                </v-chip>
              </td>
              <td>
                <v-icon color="primary" @click="openDialog(property)">mdi-pencil</v-icon>
              </td>
            </tr>
          </template>
          <tr>
            <td colspan="8">
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

    <v-dialog v-model="dialog">
      <property-form :edit="edit" :propertyInfo="propertyInfo"></property-form>
    </v-dialog>
  </v-card>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import PropertyForm from '@/components/properties/PropertyForm'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EditProperty',
  components: {
    InfiniteLoading,
    PropertyForm
  },
  data: () => ({
    infiniteId: +new Date(),
    page: 1,
    searchPropertyName: '',
    dialog: false,
    edit: false,
    propertyInfo: null
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
    openDialog (property) {
      if (property) {
        this.edit = true
        this.propertyInfo = property
      } else if (!property) {
        this.edit = false
        this.propertyInfo = null
      }
      this.dialog = true
    },
    servicesPills (property) {
      const serviceString = property.property_services
      return serviceString.split(',')
    },
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
  @import 'src/styles/layout/propertyTable';
</style>
