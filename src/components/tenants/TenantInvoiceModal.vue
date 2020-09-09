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
                <v-col class="form-section" md="6" cols="12">
                    <invoice-form v-if="!edit" />
                </v-col>
                <v-col class="preview-section" md="6" cols="12">
                    <invoice-preview />
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import InvoiceForm from '@/components/tenants/utils/InvoiceForm'
import InvoicePreview from '@/components/tenants/utils/InvoicePreview'
import { mapGetters } from 'vuex'

export default {
  name: 'TenantInvoiceModal',
  props: {
    edit: {
      type: Boolean,
      required: true
    }
  },
  components: {
    InvoiceForm,
    InvoicePreview
  },
  computed: {
    ...mapGetters('tenants', {
      tenantInvoiceCreated: 'tenantInvoiceSelected'
    })
  },
  methods: {
    closeInvoiceModal () {
      this.$store.commit('tenants/RESET_SELECTED_TENANT_INVOICE')
      this.$emit('closeInvoiceModal', false)
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/components/tenantInvoiceModal';
    .modal-invoice-form {
        .v-card__text {
            &.content {
                padding: 5.3rem 0 0 0;
                height: auto;
            }
        }
    }
</style>
