<template>
    <section>
        <div class="title">Tenant moving records</div>
        <v-card-title>
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
            </v-row>
            <v-row>
                <v-col sm="8" cols="12">
                </v-col>
            </v-row>
        </v-card-title>
        <v-data-table
            class="rental-records-table"
            :headers="headers"
            :items="tenantRentalRecords"
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
            <template v-slot:item.id="{ item }">
                <v-icon color="primary" @click="openEditTenantDialog(item.id)">mdi-pencil</v-icon>
            </template>
        </v-data-table>
    </section>
</template>

<script>
import thousandSeparator from '@/mixins/thousandSeparator'
import { format } from 'date-fns'
import { mapGetters } from 'vuex'

export default {
  name: 'TenantRentalRecordsTable',
  mixins: [thousandSeparator],
  data: () => ({
    search: '',
    headers: [
      {
        text: 'Property Name',
        align: 'start',
        sortable: false,
        value: 'property_name'
      },
      { text: 'Unit No', sortable: false, value: 'unit_no' },
      { text: 'Landlord Name', value: 'landlord_name' },
      { text: 'Rent Amount', value: 'unit_rent' },
      { text: 'Date Moved In', value: 'move_in_date' },
      { text: 'Date Moved Out', value: 'move_out_date' },
      { text: 'Edit', sortable: false, value: 'id' }
    ]
  }),
  computed: {
    ...mapGetters('tenants', {
      tenantRentalRecords: 'tenantRentalRecords',
      showLoader: 'showLoader'
    })
  },
  methods: {
    formatDate (unformedDate) {
      if (!unformedDate) return
      return format(new Date(unformedDate), 'MMM dd, yyyy')
    },
    openEditTenantDialog (recordID) {
      const payload = { 'open': true, 'edit': true }
      this.$store.commit('tenants/SHOW_MOVE_TENANT_DIALOG', payload)
      this.$store.dispatch('tenants/getTenantRentalSingleRecord', recordID)
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/tenantRentalRecordsTable';
</style>
