<template>
    <section class="tenant-banner-section d-flex align-center justify-end">
        <v-btn
            class="btn-text"
            color="primary"
            @click="openDialog = true"
        >
            Manage Tenant
        </v-btn>

        <v-overlay light :value="openDialog">
            <manage-tenant-form :tenantInfo="tenantInfo" @closeModal="closeModal" />
        </v-overlay>
    </section>
</template>

<script>
import ManageTenantForm from '@/components/tenants/utils/ManageTenantForm'

export default {
  name: 'ManageTenant',
  props: {
    tenantInfo: {
      type: Object,
      required: true
    }
  },
  components: {
    ManageTenantForm
  },
  data: () => ({
    openDialog: false
  }),
  methods: {
    closeModal (value) {
      this.openDialog = value
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/manageTenant';
</style>
