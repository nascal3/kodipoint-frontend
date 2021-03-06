<template>
    <section class="invoice-summary">
        <div v-if="showServiceBreakdown" class="section-title">Property Services</div>
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
        <hr v-if="showServiceBreakdown" class="divider-line"/>
        <div class="section-title">Total Breakdown</div>
        <div class="invoice-totals">
            <div>Rent: <span>{{thousandSeparator(tenantInvoiceCreated.rent_amount)}}</span></div>
            <div>Balance brought forward: <span>{{thousandSeparator(tenantInvoiceCreated.amount_bf)}}</span></div>
            <div>Service total: <span>{{thousandSeparator(tenantInvoiceCreated.services_amount)}}</span></div>
            <div>Amount paid: <span>{{thousandSeparator(tenantInvoiceCreated.amount_paid)}}</span></div>
            <div>Balance due: <span>{{thousandSeparator(tenantInvoiceCreated.amount_balance)}}</span></div>
        </div>
        <hr class="divider-line"/>
        <div class="section-title">Invoice Info</div>
        <div class="invoice-state">
            <v-row>
                <v-col md="6" cols="12">
                    <div class="invoice-state-period">
                        Rent period: <span>{{ formatDatePeriod(tenantInvoiceCreated.rent_period) }}</span>
                    </div>
                </v-col>
                <v-col md="6" cols="12">
                    <div class="invoice-state-due">
                        Date due: <span>{{ formatDate(tenantInvoiceCreated.date_due) }}</span>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col md="6" cols="12">
                    <div class="invoice-state-paid">
                        Date paid:
                        <span>
                            <span v-if="tenantInvoiceCreated.date_paid" class="text--success">
                                {{ formatDate(tenantInvoiceCreated.date_paid) }}
                            </span>
                            <v-chip v-else label small class="ma-2" color="error">Not Paid</v-chip>
                        </span>
                    </div>
                </v-col>
                <v-col md="6" cols="12">
                    <div class="invoice-state-sent">
                        Date issued:
                        <span>
                            <span v-if="tenantInvoiceCreated.date_issued" class="text--success">
                                {{ formatDate(tenantInvoiceCreated.date_issued) }}
                            </span>
                            <v-chip v-else label small class="ma-2" color="warning">Pending</v-chip>
                        </span>
                    </div>
                </v-col>
            </v-row>
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
    }),
    showServiceBreakdown () {
      return this.tenantInvoiceCreated &&
            this.tenantInvoiceCreated.invoice_breakdowns &&
            this.tenantInvoiceCreated.invoice_breakdowns.length
    }
  },
  methods: {
    formatDatePeriod (unformedDate) {
      if (!unformedDate) return
      return format(new Date(unformedDate), 'MMM, yyyy')
    },
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

                &:nth-child(4) {
                    span {
                        color: $success;
                    }
                }

                &:last-child {
                    border-top: solid 1px;
                    padding-top: 8px;
                    display: inline-block;
                    span {
                        color: $kodi_green;
                    }
                }
            }

        }
        .invoice-state {
            font-size: 1.6rem;
            padding-top: 1rem;
            .text--success {
                color: $success;
            }
        }
    }
</style>
