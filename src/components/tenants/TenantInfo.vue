<template>
    <v-card class="tenant-container">
        <tenant-rental-records-table />
    </v-card>
</template>

<script>
import TenantRentalRecordsTable from '@/components/tenants/TenantRentalRecordsTable'
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
    TenantRentalRecordsTable
  },
  watch: {
    selectedTenant (newTenant) {
      if (newTenant) this.getTenantsRecords()
    }
  },
  computed: {
    ...mapGetters({
      loggedInUserInfo: ['configs/loggedInUserInfo']
    })
  },
  methods: {
    ...mapActions('tenants', {
      getTenantRentalRecords: 'getTenantRentalRecords'
    }),
    getTenantsRecords () {
      const params = {
        'tenant_id': this.selectedTenant.id,
        'landlord_id': this.loggedInUserInfo.landlord_id
      }
      this.getTenantRentalRecords(params)
    }
  },
  created () {
    this.getTenantsRecords()
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/tenantInfo';
</style>
