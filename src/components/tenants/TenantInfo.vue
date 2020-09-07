<template>
    <v-card class="tenant-container">
        <v-tabs class="tenant-container-tabs" v-model="tab">
            <v-tabs-slider/>
            <v-tab href="#moving">Moving Records</v-tab>
            <v-tab href="#invoice">Invoices</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item value="moving" class="tab-container">
                <tenant-rental-records-table />
            </v-tab-item>
            <v-tab-item value="invoice" class="tab-container">
                <tenant-invoice-records-table />
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
import TenantRentalRecordsTable from '@/components/tenants/TenantRentalRecordsTable'
import TenantInvoiceRecordsTable from '@/components/tenants/TenantInvoiceRecordsTable'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TenantInfo',
  props: {
    selectedTenant: {
      type: Object,
      required: true
    }
  },
  components: {
    TenantRentalRecordsTable,
    TenantInvoiceRecordsTable
  },
  data: () => ({
    tab: 'moving'
  }),
  watch: {
    selectedTenant (newTenant) {
      if (newTenant) {
        this.getMovingRecords()
        this.getInvoiceRecords()
      }
    }
  },
  computed: {
    ...mapGetters({
      loggedInUserInfo: ['configs/loggedInUserInfo']
    })
  },
  methods: {
    ...mapActions('tenants', {
      getTenantRentalRecords: 'getTenantRentalRecords',
      getTenantInvoiceRecords: 'getTenantInvoiceRecords'
    }),
    getMovingRecords () {
      const params = {
        'tenant_id': this.selectedTenant.id,
        'landlord_id': this.loggedInUserInfo.landlord_id
      }
      this.getTenantRentalRecords(params)
    },
    getInvoiceRecords () {
      const params = {
        'tenant_id': this.selectedTenant.id
      }
      this.getTenantInvoiceRecords(params)
    }
  },
  created () {
    this.getMovingRecords()
    this.getInvoiceRecords()
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/tenantInfo';
</style>
