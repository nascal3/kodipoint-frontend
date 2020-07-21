<template>
    <v-card class="modal-info-table" light>
        <v-card-title class="heading">
            <div class="title">
                Tenants in "{{showPropertyTenants}}"
            </div>
            <v-icon class="close-icon" color="primary" @click="closeModal">
                mdi-close
            </v-icon>
        </v-card-title>
        <v-card-text class="content">
            <v-row>
                <v-col sm="4" cols="12">
                    <v-text-field
                        class="search-tenant-table"
                        v-model="search"
                        prepend-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col sm="8" cols="12"></v-col>
            </v-row>
            <v-data-table
                class="tenants-property-table"
                :headers="headers"
                :items="propertyTenants"
                :search="search"
                :loading="showLoader"
                loading-text="Loading... Please wait"
                dense
                fixed-header
            >
                <template v-slot:item.unit_rent="{ item }">
                    {{ thousandSeparator(item.unit_rent) }}
                </template>
                <template v-slot:item.move_in_date="{ item }">
                    {{ formatDate(item.move_in_date) }}
                </template>
                <template v-slot:item.move_out_date="{ item }">
                    {{ formatDate(item.move_out_date) }}
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
import { format } from 'date-fns'
import { mapGetters } from 'vuex'
import thousandSeparator from '@/mixins/thousandSeparator'

export default {
  name: 'PropertyTenantsTable',
  mixins: [thousandSeparator],
  data: () => ({
    search: '',
    headers: [
      { text: 'Tenant Name', align: 'start', value: 'tenant.name' },
      { text: 'Phone Number', sortable: false, value: 'tenant.phone' },
      { text: 'Email', sortable: false, value: 'tenant.email' },
      { text: 'Unit No', sortable: false, value: 'unit_no' },
      { text: 'Rent Amount', value: 'unit_rent' },
      { text: 'Date Moved In', value: 'move_in_date' },
      { text: 'Date Moved Out', value: 'move_out_date' }
    ]
  }),
  computed: {
    ...mapGetters('property', {
      showLoader: 'showLoader',
      propertyTenants: 'propertyTenants',
      showPropertyTenants: 'showPropertyTenants'
    })
  },
  methods: {
    formatDate (unformedDate) {
      if (!unformedDate) return
      return format(new Date(unformedDate), 'MMM dd, yyyy')
    },
    closeModal () {
      this.$store.commit('property/SHOW_PROPERTY_TENANTS', '')
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/components/propertyTenantsTable';
</style>
