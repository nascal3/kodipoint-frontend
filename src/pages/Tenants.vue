<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="2">
        <tenant-list class="landlord-list" @openAddDialog="openDialog" :reloadValue="changed" />
      </v-col>
      <v-col cols="12" sm="10" v-if="showSection">
        <tenant-details class="landlord-table-card" @openEditDialog="openDialog" />
<!--        <property-table :landlordSelected="landlordSelected"></property-table>-->
      </v-col>
    </v-row>
<!--    <v-overlay light :value="dialog">-->
<!--      <landlord-form @closeModal="closeModal" :edit="edit" :landlordInfo="landlordInfo" />-->
<!--    </v-overlay>-->
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import TenantList from '@/components/tenants/TenantList'
import TenantDetails from '@/components/tenants/TenantsDetails'

export default {
  name: 'Tenants',
  data: () => ({
    changed: null,
    dialog: false,
    edit: false,
    tenantInfo: {}
  }),
  components: {
    TenantList,
    TenantDetails
  },
  computed: {
    ...mapGetters('tenants', {
      tenantSelected: 'selectedTenant'
    }),
    showSection () {
      console.log('BB', this.tenantSelected)
      return Object.keys(this.tenantSelected).length
    }
  },
  watch: {
    tenantSelected (newValues) {
      this.tenantInfo = newValues
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/pages/tenants';
</style>
