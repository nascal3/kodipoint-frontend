<template>
    <section class="invoice-summary">
        <div class="section-title">Property Services</div>
        <v-chip
            v-for="service in tenantInvoiceCreated.invoice_breakdowns"
            class="ma-2"
            label
            color="primary"
            text-color="white"
            :key="service.id"
        >
            {{service.service_name}}: {{thousandSeparator(service.service_price)}}/=
        </v-chip>
        <hr class="divider-line"/>
        <div class="section-title">Sub Total</div>
        <div class="invoice-totals">
            <div>Rent: <span>{{thousandSeparator(tenantInvoiceCreated.rent_amount)}}</span></div>
            <div>Service total: <span>{{thousandSeparator(tenantInvoiceCreated.services_amount)}}</span></div>
            <div>Amount paid: <span>{{thousandSeparator(tenantInvoiceCreated.amount_paid)}}</span></div>
            <div>Amount due: <span>{{thousandSeparator(tenantInvoiceCreated.amount_balance)}}</span></div>
        </div>
        <hr class="divider-line"/>
        <div class="section-title">Invoice Info</div>
        <div class="invoice-state">
            <div class="invoice-state-period">
                Rent period: <span>{{ formatDate(tenantInvoiceCreated.rent_period) }}</span>
            </div>
            <div class="invoice-state-due">
                Date due: <span>{{ formatDate(tenantInvoiceCreated.date_due) }}</span>
            </div>
            <div class="invoice-state-paid">
                Date paid:
                <span>
                    <span v-if="tenantInvoiceCreated.date_paid" class="text--success">{{ formatDate(tenantInvoiceCreated.date_paid) }}</span>
                    <v-chip v-else label small class="ma-2" color="error">Not Paid</v-chip>
                </span>
            </div>
            <div class="invoice-state-sent">
                Date issued/sent:
                <span>
                    <span v-if="tenantInvoiceCreated.date_issued" class="text--success">{{ formatDate(tenantInvoiceCreated.date_issued) }}</span>
                    <v-chip v-else label small class="ma-2" color="warning">Pending</v-chip>
                </span>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import thousandSeparator from '@/mixins/thousandSeparator'
import { format } from 'date-fns'

export default {
  name: 'InvoiceSummary',
  mixins: [thousandSeparator],
  computed: {
    ...mapGetters('tenants', {
      tenantInvoiceCreated: 'tenantInvoiceSelected'
    })
  },
  methods: {
    formatDate (unformedDate) {
      if (!unformedDate) return
      return format(new Date(unformedDate), 'MMM dd, yyyy')
    }
  }
}
</script>

<style lang="scss" scoped>
    .invoice-summary {
        padding: 1.5rem;
        .divider-line {
            border-top: solid 1px $border_table_color_grey_light;
            margin: 1.1rem 0 1.5rem;
        }
        .invoice-totals {
            margin-top: 1rem;
            div {
                margin: 8px 0 0 1rem;
                font-size: 16px;
                font-weight: 300;
                text-transform: capitalize;
                span {
                    font-weight: 500;
                    color: $primary;
                }

                &:nth-child(3) {
                    span {
                        color: $success;
                    }
                }

                &:last-child {
                    span {
                        color: $kodi_green;
                    }
                }
            }

        }
        .invoice-state {
            font-size: 1.6rem;
            padding-top: 1rem;
            div {
                margin-left: 1rem;
                line-height: 2.5rem;
            }
            .text--success {
                color: $success;
            }
        }
    }
</style>
