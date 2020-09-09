<template>
    <section>
        <div class="top-section d-flex align-center justify-space-between">
            <div class="heading-title">Invoice records</div>
            <v-btn class="btn-text" color="secondary" @click="openTenantInvoiceDialog">
                <v-icon left>mdi-plus</v-icon>
                Create Invoice
            </v-btn>
        </div>

        <v-card-title class="card-title">
            <v-row no-gutters>
                <v-col sm="7" cols="12">
                    <v-text-field
                        class="search-invoice-table"
                        v-model="search"
                        prepend-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col sm="5" cols="12">
                    <v-row no-gutters>
                        <v-col class="d-flex align-center justify-end" cols="12" md="3">
                            <span class="filter-label">Rent Period:</span>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :return-value.sync="dateFrom"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="dateFrom"
                                        label="From Date"
                                        prepend-icon="event"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="dateFrom" :max="maximumDate">
                                    <v-spacer></v-spacer>
                                    <v-btn class="btn-text" text color="primary" @click="menu = false">Cancel</v-btn>
                                    <v-btn class="btn-text" color="primary" @click="$refs.menu.save(dateFrom)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-menu
                                ref="menu2"
                                v-model="menu2"
                                :close-on-content-click="false"
                                :return-value.sync="dateTo"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="dateTo"
                                        label="To Date"
                                        prepend-icon="event"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="dateTo" :min="minimumDate">
                                    <v-spacer></v-spacer>
                                    <v-btn class="btn-text" text color="primary" @click="menu2 = false">Cancel</v-btn>
                                    <v-btn class="btn-text" color="primary" @click="$refs.menu2.save(dateTo)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col class="d-flex align-center" cols="12" md="1">
                            <v-btn icon color="primary" @click="filterInvoiceByDate">
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-title>
        <v-data-table
            class="invoice-records-table"
            :headers="headers"
            :items="tenantInvoiceRecords"
            :search="search"
            :loading="showLoader"
            loading-text="Loading... Please wait"
            dense
            fixed-header
            @click:row="openTenantInvoiceDialog"
        >
            <template v-slot:item.amount_balance="{ item }">
                {{ thousandSeparator(item.amount_balance) }}
            </template>
            <template v-slot:item.rent_period="{ item }">
                {{ formatDate(item.rent_period) }}
            </template>
            <template v-slot:item.date_due="{ item }">
                {{ formatDate(item.date_due) }}
            </template>
            <template v-slot:item.date_paid="{ item }">
                <span v-if="paidStatus(item.date_paid)" class="text--success">{{ formatDate(item.date_paid) }}</span>
                <v-chip v-else label small class="ma-2" outlined color="error">Not Paid</v-chip>
            </template>
            <template v-slot:item.date_issued="{ item }">
               <span v-if="sentStatus(item.date_issued)" class="text--success">{{formatDate(item.date_issued)}}</span>
               <v-chip v-else label small class="ma-2" outlined color="warning">Pending</v-chip>
            </template>
            <template v-slot:item.id="{ item }">
                <span>#{{item.id}}</span>
            </template>
        </v-data-table>
    </section>
</template>

<script>
import thousandSeparator from '@/mixins/thousandSeparator'
import { sub, format } from 'date-fns'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TenantInvoiceRecordsTable',
  mixins: [thousandSeparator],
  data: () => ({
    menu: false,
    menu2: false,
    dateFrom: '',
    dateTo: new Date().toISOString().substr(0, 10),
    minimumDate: '',
    maximumDate: '',
    search: '',
    headers: [
      { text: 'Invoice #', value: 'id' },
      {
        text: 'Property Name',
        align: 'start',
        value: 'property_name'
      },
      { text: 'Unit No', sortable: false, value: 'unit_no' },
      { text: 'Amount', value: 'amount_balance' },
      { text: 'Rent Period', value: 'rent_period' },
      { text: 'Due date', value: 'date_due' },
      { text: 'Date paid', value: 'date_paid' },
      { text: 'Invoice Sent', value: 'date_issued' }
    ]
  }),
  watch: {
    dateFrom (newDate) {
      this.minimumDate = newDate
      this.$store.commit('tenants/DATE_FROM', newDate)
      this.$store.commit('tenants/DATE_TO', this.dateTo)
    },
    dateTo (newDate) {
      this.maximumDate = newDate
      this.$store.commit('tenants/DATE_TO', newDate)
    }
  },
  computed: {
    ...mapGetters('tenants', {
      tenantInvoiceRecords: 'tenantInvoiceRecords',
      selectedTenant: 'selectedTenant',
      showLoader: 'showLoader'
    }),
    computedDate () {
      const calculatedDate = sub(new Date(), { months: 2 })
      return format(calculatedDate, 'yyyy-MM-dd')
    }
  },
  methods: {
    ...mapActions('tenants', {
      getTenantInvoiceRecords: 'getTenantInvoiceRecords'
    }),
    formatDate (unformedDate) {
      if (!unformedDate) return
      return format(new Date(unformedDate), 'MMM dd, yyyy')
    },
    sentStatus (date) {
      return date
    },
    paidStatus (date) {
      return date
    },
    filterInvoiceByDate () {
      const params = {
        'tenant_id': this.selectedTenant.id,
        'date_from': this.dateFrom,
        'date_to': this.dateTo
      }
      this.getTenantInvoiceRecords(params)
    },
    openTenantInvoiceDialog ($event) {
      const edit = !!$event.id
      const payload = { 'open': true, 'edit': edit }
      this.$store.commit('tenants/SHOW_TENANT_INVOICE_DIALOG', payload)
      if (!edit) return
      this.$store.dispatch('tenants/getTenantInvoiceSingleRecord', $event.id)
    }
  },
  created () {
    this.dateFrom = this.computedDate
    this.maximumDate = new Date().toISOString().substr(0, 10)
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/tenantInvoiceRecordsTable';
</style>
