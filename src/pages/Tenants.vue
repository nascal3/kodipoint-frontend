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
    <v-overlay light :value="dialog">
      <tenant-form @closeModal="closeModal" :edit="edit" :tenant-info="tenantInfo" />
    </v-overlay>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TenantList from '@/components/tenants/TenantList'
import TenantDetails from '@/components/tenants/TenantsDetails'
import TenantForm from '@/components/tenants/TenantForm'

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
    TenantDetails,
    TenantForm
  },
  computed: {
    ...mapGetters('tenants', {
      tenantSelected: 'selectedTenant'
    }),
    showSection () {
      return Object.keys(this.tenantSelected).length
    }
  },
  watch: {
    tenantSelected (newValues) {
      this.tenantInfo = newValues
    }
  },
  methods: {
    ...mapActions('landlord', {
      resetSelectedLandlord: 'resetSelectedLandlord'
    }),
    openDialog (tenant) {
      this.edit = !!Object.keys(tenant).length
      this.dialog = true
    },
    closeModal (value) {
      this.dialog = value.openState
      if (value.formSubmitted) {
        this.resetSelectedLandlord()
        this.changed = +new Date()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/pages/tenants';
</style>
