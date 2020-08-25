<template>
  <v-container fluid>
    <v-row class="content">
      <v-col class="list-area" cols="12" sm="2">
        <tenant-list @openAddDialog="openDialog" :reloadValue="changed" />
      </v-col>
      <v-col cols="12" sm="10" v-if="showSection">
        <user-details-banner class="table-card" @openEditDialog="openDialog" />
        <tenant-info :selected-tenant="tenantInfo" />
      </v-col>
    </v-row>
    <v-overlay light :value="dialog">
      <tenant-form @closeTenantModal="closeModal" :edit="edit" :tenant-info="tenantInfo" />
    </v-overlay>

    <v-overlay light :value="showMoveTenantDialog.open">
      <manage-tenant-form :tenantInfo="tenantInfo" @closeMoveTenantForm="closeMoveTenantForm" />
    </v-overlay>

    <v-overlay light :value="showTenantInvoiceDialog.open">
      <tenant-invoice-modal @closeInvoiceModal="closeInvoiceModal"/>
    </v-overlay>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TenantList from '@/components/tenants/TenantList'
import UserDetailsBanner from '@/components/utils/UserDetailsBanner'
import TenantForm from '@/components/tenants/TenantForm'
import TenantInfo from '@/components/tenants/TenantInfo'
import ManageTenantForm from '@/components/tenants/utils/MoveInTenantForm'
import TenantInvoiceModal from '@/components/tenants/TenantInvoiceModal'
import checkLandlordApproval from '@/mixins/checkLandlordApproval'

export default {
  name: 'Tenants',
  mixins: [checkLandlordApproval],
  data: () => ({
    changed: null,
    dialog: false,
    edit: false,
    tenantInfo: {}
  }),
  components: {
    TenantList,
    TenantForm,
    TenantInfo,
    TenantInvoiceModal,
    UserDetailsBanner,
    ManageTenantForm
  },
  computed: {
    ...mapGetters('tenants', {
      tenantSelected: 'selectedTenant',
      showMoveTenantDialog: 'showMoveTenantDialog',
      showTenantInvoiceDialog: 'showTenantInvoiceDialog'
    }),
    showSection () {
      return Object.keys(this.tenantSelected).length > 0
    }
  },
  watch: {
    tenantSelected (newValues) {
      this.tenantInfo = newValues
    }
  },
  methods: {
    ...mapActions('tenants', {
      resetSelectedTenant: 'resetSelectedTenant'
    }),
    openDialog (tenant) {
      this.edit = !!Object.keys(tenant).length
      this.dialog = true
    },
    closeModal (value) {
      this.dialog = value.openState
      if (value.formSubmitted) {
        this.resetSelectedTenant()
        this.changed = +new Date()
      }
    },
    closeMoveTenantForm (value) {
      const payload = { 'open': value, 'edit': false }
      this.$store.commit('tenants/SHOW_MOVE_TENANT_DIALOG', payload)
    },
    closeInvoiceModal (value) {
      const payload = { 'open': value, 'edit': false }
      this.$store.commit('tenants/SHOW_TENANT_INVOICE_DIALOG', payload)
    }
  },
  created () {
    this.checkLandlordApproval()
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/components/defaultInfoPage';
</style>
