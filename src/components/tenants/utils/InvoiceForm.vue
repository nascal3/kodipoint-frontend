<template>
    <section class="invoice-form">
        <v-alert v-if="invoiceDuplicationError" type="error" dense>
            The following invoice already exists
        </v-alert>
        <v-form v-if="!invoiceNumber" ref="form" v-model="valid" @submit.prevent="createNewInvoice">
            <div class="section-title">Select property</div>
            <v-select
                v-model="selectedProperty"
                :items="propertyNames"
                label="Rented property"
                :rules="[rules.propertyNameRequired]"
                @change="getSelectedPropertyDetails"
            ></v-select>

            <v-row>
                <v-col md="6" cols="12">
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="rentPeriod"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="rentPeriod"
                                label="Rent period"
                                prepend-icon="event"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker type="month" v-model="rentPeriod">
                            <v-spacer></v-spacer>
                            <v-btn class="btn-text" text color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn class="btn-text" color="primary" @click="$refs.menu.save(rentPeriod)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                    <v-text-field
                        v-model="unitNum"
                        label="Unit number*"
                        :rules="[rules.unitNumRequired]"
                        name="unitNum"
                    ></v-text-field>
                </v-col>
                <v-col md="6" cols="12">
                    <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :return-value.sync="dateDue"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateDue"
                                label="Due date"
                                prepend-icon="event"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="dateDue">
                            <v-spacer></v-spacer>
                            <v-btn class="btn-text" text color="primary" @click="menu2 = false">Cancel</v-btn>
                            <v-btn class="btn-text" color="primary" @click="$refs.menu2.save(dateDue)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                    <v-text-field
                        v-model="amountPaid"
                        label="Amount paid*"
                        :rules="[rules.paidAmountRequired]"
                        name="amountPaid"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="6">
                    <v-btn
                        class="btn-text"
                        block
                        outlined
                        color="default"
                        @click="closeInvoiceModal(false)"
                    >
                        Cancel
                    </v-btn>
                </v-col>
                <v-col cols="12" md="6">
                    <v-btn
                        type="submit"
                        :loading="showLoader"
                        :disabled="showLoader"
                        class="btn-text"
                        block
                        color="primary"
                    >
                        Create invoice
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>

        <div v-if="showPropertyServices" class="section-title">Property services</div>
        <v-chip
            v-for="service in tenantInvoiceCreated.invoice_breakdowns"
            class="ma-2"
            label
            close
            color="primary"
            text-color="white"
            close-icon="mdi-delete"
            @click:close="serviceOperation='remove', addRemoveInvoiceServices(service)"
            :key="service.id"
        >
            {{service.service_name}}: {{thousandSeparator(service.service_price)}}/=
        </v-chip>
        <v-form v-if="invoiceNumber" ref="serviceForm" @submit.prevent="addRemoveInvoiceServices">
            <div class="section-title">Add service charges</div>
            <v-row>
                <v-col md="4" cols="12">
                    <v-text-field
                        v-model="serviceName"
                        label="Service name*"
                        :rules="[rules.serviceNameRequired]"
                        dense
                        name="serviceName"
                    ></v-text-field>
                </v-col>
                <v-col md="3" cols="12">
                    <v-text-field
                        v-model="servicePrice"
                        label="Price*"
                        :rules="[rules.servicePriceRequired]"
                        dense
                        name="servicePrice"
                    ></v-text-field>
                </v-col>
                <v-col class="d-flex align-center" md="5" cols="12">
                    <v-btn
                        type="submit"
                        class="btn-text"
                        :loading="showLoader"
                        :disabled="showLoader"
                        block
                        small
                        color="primary"
                        @click="serviceOperation='add'"
                    >
                        <v-icon left>mdi-plus</v-icon>
                        Add service charge
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </section>
</template>

<script>
import { format } from 'date-fns'
import { mapGetters, mapActions } from 'vuex'
import thousandSeparator from '@/mixins/thousandSeparator'

export default {
  name: 'InvoiceForm',
  mixins: [thousandSeparator],
  data: () => ({
    menu: false,
    menu2: false,
    valid: false,
    propertyNames: [],
    selectedProperty: '',
    propertyId: null,
    rentPeriod: format(new Date(), 'yyyy-MM'),
    dateDue: format(new Date(), 'yyyy-MM-dd'),
    unitNum: '',
    amountPaid: '0',
    invoiceNumber: null,
    serviceName: '',
    servicePrice: '',
    serviceOperation: null,
    rules: {
      unitNumRequired: value => !!value || 'Property unit number required',
      propertyNameRequired: value => !!value || 'Property name required',
      serviceNameRequired: value => !!value || 'Service name required',
      paidAmountRequired: value => !!value || 'Paid amount required',
      servicePriceRequired: value => !!value || 'Service price required'
    }
  }),
  watch: {
    async amountPaid (newValue) {
      const result = newValue.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      await this.$nextTick(() => {
        this.amountPaid = result
      })
    },
    async servicePrice (newValue) {
      const result = newValue.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      await this.$nextTick(() => {
        this.servicePrice = result
      })
    },
    tenantRentedProperties () {
      this.setPropertyName()
    }
  },
  computed: {
    ...mapGetters('tenants', {
      selectedTenant: 'selectedTenant',
      showLoader: 'showLoader',
      invoiceDuplicationError: 'invoiceDuplicationError',
      tenantRentedProperties: 'tenantRentedProperties',
      tenantInvoiceCreated: 'tenantInvoiceSelected'
    }),
    showPropertyServices () {
      return this.tenantInvoiceCreated &&
          this.tenantInvoiceCreated.invoice_breakdowns &&
          this.tenantInvoiceCreated.invoice_breakdowns.length
    }
  },
  methods: {
    ...mapActions('tenants', {
      getTenantRentalProperties: 'getTenantRentalProperties',
      createInvoice: 'createInvoice',
      dateFrom: 'dateFrom',
      dateTo: 'dateTo',
      getTenantInvoiceRecords: 'getTenantInvoiceRecords',
      addRemovePropertyServices: 'addRemovePropertyServices'
    }),
    setPropertyName () {
      if (this.tenantRentedProperties.length) {
        this.tenantRentedProperties.forEach(property => {
          this.propertyNames.push(property.property_name)
        })
      }
    },
    getSelectedPropertyDetails () {
      const [selectedProperty] = this.tenantRentedProperties.filter(property => {
        return property.property_name === this.selectedProperty
      })
      this.unitNum = selectedProperty.unit_no
      this.propertyId = selectedProperty.property_id
    },
    async getInvoiceRecords () {
      const params = {
        'tenant_id': this.selectedTenant.id,
        'date_from': this.dateFrom,
        'date_to': this.dateTo
      }
      await this.getTenantInvoiceRecords(params)
    },
    closeInvoiceModal (value) {
      this.$store.commit('tenants/RESET_SELECTED_TENANT_INVOICE')
      const payload = { 'open': value, 'edit': false }
      this.$store.commit('tenants/SHOW_TENANT_INVOICE_DIALOG', payload)
    },
    async createNewInvoice () {
      const params = {
        'tenant_id': this.selectedTenant.id,
        'property_id': this.propertyId,
        'rent_period': this.rentPeriod,
        'date_due': this.dateDue,
        'unit_no': this.unitNum,
        'amount_paid': this.formatPriceToNumber(this.amountPaid)
      }
      this.valid = this.$refs.form.validate()
      if (!this.valid) return
      try {
        const results = await this.createInvoice(params)
        if (Object.keys(results).length) {
          this.invoiceNumber = results.id
          await this.getInvoiceRecords()
        }
      } catch (err) {
        throw err
      }
    },
    async addRemoveInvoiceServices (service) {
      const params = {
        'invoice_id': this.invoiceNumber,
        'service_name': this.serviceName || service.service_name,
        'service_price': this.formatPriceToNumber(this.servicePrice) || service.service_price,
        'operation': this.serviceOperation
      }

      this.valid = this.$refs.serviceForm.validate()
      if (!service) {
        if (!this.valid) return
      }

      try {
        await this.addRemovePropertyServices(params)
        this.serviceName = ''
        this.servicePrice = ''
        this.serviceOperation = null
      } catch (err) {
        throw err
      }
    }
  },
  created () {
    this.getTenantRentalProperties(this.selectedTenant.id)
  }
}
</script>

<style lang="scss" scoped>
    .invoice-form {
        padding: 1rem;
        font-size: 1.2rem;
         form {
             width: 100%;
         }
    }
</style>
