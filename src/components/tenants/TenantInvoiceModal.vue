<template>
    <v-card class="modal-invoice-form" light>
        <v-card-title class="heading">
            <div class="header-title">
                Invoice details
            </div>
            <v-icon class="close-icon" color="primary" @click="closeInvoiceModal(false)">
                mdi-close
            </v-icon>
        </v-card-title>
    </v-card>
</template>

<script>
export default {
  name: 'TenantInvoiceModal',
  methods: {
    closeInvoiceModal () {
      this.$emit('closeInvoiceModal', false)
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/components/tenantInvoiceModal';
</style>
