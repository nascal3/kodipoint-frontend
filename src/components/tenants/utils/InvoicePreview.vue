<template>
    <section class="preview">
        <div class="invoice-preview">
            <section class="header">
                <!--    company logo and contacts-->
                <div class="company-info">
                    <div class="company-logo">
                        <img class="logo" :src="require('@/assets/images/kodiPoint_logo.png')" alt="KodiPoint logo">
                    </div>
                    <div class="company-contacts">
                        <div>KodiPoint</div>
                        <div>(+254) 708 486 139</div>
                        <div>P.O Box: 54679, 00200 Nairobi</div>
                        <div>info@kodipoint.com</div>
                    </div>
                </div>
                <!--    Invoice details e.g date issued, balance due ...-->
                <div class="invoice-info">
                    <div>invoice</div>
                    <div><span>Invoice #:</span> {{tenantInvoiceCreated.id}}</div>
                    <div><span>Rent period:</span> {{formatDateMonth(tenantInvoiceCreated.rent_period)}}</div>
                    <div><span>Due Date:</span> {{formatDate(tenantInvoiceCreated.date_due)}}</div>
                    <div><span>Date Issued:</span>
                        {{
                            tenantInvoiceCreated.date_issued
                                ? formatDate(tenantInvoiceCreated.date_issued)
                                : 'NOT SENT'
                        }}
                    </div>
                    <div class="invoice-balance">
                        <div>Balance due:</div>
                        <div><span>Ksh</span> {{thousandSeparator(tenantInvoiceCreated.amount_balance)}}</div>
                    </div>
                </div>
            </section>
            <section class="property">
                <div class="property-name">
                    {{tenantInvoiceCreated.property_name}}
                </div>
            </section>
            <section class="tenant-info">
                <!--    tenants contacts-->
                <div class="tenant-contacts">
                    <div>Bill to:</div>
                    <div>{{tenantInvoiceCreated.name}}</div>
                    <div>{{tenantInvoiceCreated.phone}}</div>
                    <div>{{tenantInvoiceCreated.email}}</div>
                    <div><span>Rental Unit:</span> {{tenantInvoiceCreated.unit_no}}</div>
                </div>
            </section>
            <section class="breakdown-table">
                <!--  invoice breakdown table  -->
                <table class="rent-cost">
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                    <tr>
                        <td>Rent</td>
                        <td>{{thousandSeparator(tenantInvoiceCreated.rent_amount)}}</td>
                    </tr>
                    <tr>
                        <td>Balance brought forward</td>
                        <td>{{thousandSeparator(tenantInvoiceCreated.amount_bf)}}</td>
                    </tr>
                </table>

                <table class="services-cost">
                    <tr v-for="(service, index) in tenantInvoiceCreated.invoice_breakdowns" :key="index">
                        <td>{{service.service_name}}</td>
                        <td>{{thousandSeparator(service.service_price)}}</td>
                    </tr>
                </table>

                <hr class="total-divider">
                <table class="total-cost">
                    <tr>
                        <td>Sub total:</td>
                        <td>{{thousandSeparator(tenantInvoiceCreated.amount_owed)}}</td>
                    </tr>
                    <tr>
                        <td>Amount paid:</td>
                        <td>{{thousandSeparator(tenantInvoiceCreated.amount_paid)}}</td>
                    </tr>
                    <tr>
                        <td>Total due:</td>
                        <td>{{thousandSeparator(tenantInvoiceCreated.amount_balance)}}</td>
                    </tr>
                </table>
            </section>
            <footer>
                <span>If you have any questions concerning this invoice please contact us.</span>
            </footer>
        </div>
        <v-btn
            :disabled="!showSendButton || showLoaderInvoice"
            :loading="showLoaderInvoice"
            small
            class="send-button btn-text"
            color="info"
            @click="sendInvoice"
        >
            Send
            <v-icon v-if="!showLoaderInvoice" right>mdi-send</v-icon>
        </v-btn>
    </section>
</template>

<script>
import { format, parseISO } from 'date-fns'
import { mapGetters, mapActions } from 'vuex'
import thousandSeparator from '@/mixins/thousandSeparator'

export default {
  name: 'InvoicePreview',
  mixins: [thousandSeparator],
  computed: {
    ...mapGetters('tenants', {
      showLoaderInvoice: 'showLoader',
      dateFrom: 'dateFrom',
      dateTo: 'dateTo',
      tenantInvoiceCreated: 'tenantInvoiceSelected'
    }),
    showSendButton () {
      return Object.keys(this.tenantInvoiceCreated).length
    }
  },
  methods: {
    ...mapActions('tenants', {
      getTenantInvoiceRecords: 'getTenantInvoiceRecords',
      getTenantInvoiceSingleRecord: 'getTenantInvoiceSingleRecord',
      sendOutTenantInvoice: 'sendOutTenantInvoice'
    }),
    formatDateMonth (value) {
      if (!value) return
      return format(parseISO(value), 'MMM yyyy')
    },
    formatDate: function (date) {
      if (!date) return
      return format(parseISO(date), 'MMM, d yyyy')
    },
    async getInvoiceRecords () {
      try {
        const params = {
          'tenant_id': this.tenantInvoiceCreated.tenant_id,
          'date_from': this.dateFrom,
          'date_to': this.dateTo
        }
        await this.getTenantInvoiceRecords(params)
        await this.getTenantInvoiceSingleRecord(this.tenantInvoiceCreated.id)
      } catch (err) {
        throw err
      }
    },
    async sendInvoice () {
      try {
        const param = {
          'invoice_number': this.tenantInvoiceCreated.id
        }
        const results = await this.sendOutTenantInvoice(param)
        if (results) {
          await this.getInvoiceRecords()
          const options = { icon: 'check_circle_outline' }
          this.$toasted.success(`Invoice send successfully`, options)
        }
      } catch (err) {
        const options = { icon: 'error_outline' }
        this.$toasted.error(`Error: Invoice not send`, options)
        throw err
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/invoicePreview';
</style>
