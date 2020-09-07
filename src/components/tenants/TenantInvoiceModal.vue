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
        <v-card-text class="content">
            <v-row>
                <v-col class="form-section" md="7" cols="12">
                    <invoice-form v-if="!edit" />
                </v-col>
                <v-col class="preview-section" md="5" cols="12">
                    invoice image
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import InvoiceForm from '@/components/tenants/utils/InvoiceForm'

export default {
  name: 'TenantInvoiceModal',
  props: {
    edit: {
      type: Boolean,
      required: true
    }
  },
  components: {
    InvoiceForm
  },
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
