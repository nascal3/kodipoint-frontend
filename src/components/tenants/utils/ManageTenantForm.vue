<template>
    <v-card class="modal-info-form" light>
        <v-card-title class="heading">
            <div class="title">
                Manage Tenant
            </div>
            <v-icon class="close-icon" color="primary" @click="closeManageTenantForm">
                mdi-close
            </v-icon>
        </v-card-title>
        <v-card-text class="content">
            <transition name="fade">
                <v-alert
                    v-if="moveInDuplicationError || noVacancyError"
                    dense
                    type="error"
                >
                    {{
                        moveInDuplicationError
                            ? 'The following entry has already been made!'
                            : 'This property unit is not vacant!'
                    }}
                </v-alert>
            </transition>
            <v-form ref="form" enctype="multipart/form-data" v-model="valid" @submit.prevent="moveInTenant">
                <v-row>
                    <v-col cols="12" v-if="!isLandlordRole">
                        <div class="section-title">Select landlord</div>
                        <dynamic-landlord-select @landlordSelect="landlordSelected" />
                        <div class="input-hint">
                            Type landlord name or click to select landlord.
                        </div>
                        <transition name="fade">
                            <div class="input-error" v-if="selectLandlordValidationError">
                                Please select landlord
                            </div>
                        </transition>
                    </v-col>
                    <v-col cols="12">
                        <div class="section-title">Select property</div>
                        <dynamic-properties-select
                            :user_id="selectedLandlord.user_id"
                            @propertySelect="propertySelected"
                        />
                        <div class="input-hint">
                            Type property name or click to select property.
                        </div>
                        <transition name="fade">
                            <div class="input-error" v-if="selectTenantValidationError">
                                Please select property
                            </div>
                        </transition>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="unitNum"
                            label="Unit number*"
                            :rules="[rules.unitNumRequired]"
                            name="contactPerson"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model.lazy="unitRent"
                            v-money="money"
                            label="Unit rent amount*"
                            :rules="[rules.unitRentRequired]"
                            name="contactPerson"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="moveInDate"
                                    label="Date moved in"
                                    prepend-icon="event"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="moveInDate" @input="menu = false"></v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-btn
                            type="submit"
                            :loading="showLoader"
                            :disabled="showLoader"
                            class="btn-text"
                            block
                            color="primary"
                        >
                           Save Changes
                        </v-btn>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-btn
                            class="btn-text"
                            block
                            outlined
                            color="default"
                            @click="closeManageTenantForm"
                        >
                            Cancel
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import DynamicLandlordSelect from '@/components/landlords/utils/DynamicLandlordSelect'
import DynamicPropertiesSelect from '@/components/tenants/utils/DynamicPropertiesSelect'
import { VMoney } from 'v-money'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ManageTenantForm',
  props: {
    tenantInfo: {
      type: Object,
      required: true
    }
  },
  components: {
    DynamicLandlordSelect,
    DynamicPropertiesSelect
  },
  data: () => ({
    valid: false,
    menu: false,
    selectedProperty: {},
    selectedLandlord: {},
    moveInDate: new Date().toISOString().substr(0, 10),
    unitNum: '',
    unitRent: '',
    money: {
      decimal: '.',
      thousands: ',',
      masked: false
    },
    rules: {
      unitNumRequired: value => !!value || 'Property unit number required',
      unitRentRequired: value => !!value || 'Unit rent amount required'
    }
  }),
  directives: { money: VMoney },
  computed: {
    ...mapGetters({
      token: ['auth/token'],
      showLoader: ['tenants/showLoader'],
      userInfo: ['configs/loggedInUserInfo'],
      moveInDuplicationError: ['tenants/moveInDuplicationError'],
      noVacancyError: ['tenants/noVacancyError']
    }),
    isLandlordRole () {
      return this.token.user.role === 'landlord' || this.token.user.role === 'landlordTenant'
    },
    hasProperty () {
      return Object.keys(this.selectedProperty).length
    },
    hasLandlord () {
      return Object.keys(this.selectedLandlord).length
    },
    selectLandlordValidationError () {
      return this.valid && this.selectedLandlord && !this.selectedLandlord.landlord_id
    },
    selectTenantValidationError () {
      return this.valid && this.selectedProperty && !this.selectedProperty.property_name
    }
  },
  methods: {
    ...mapActions('tenants', {
      getTenantRentalRecords: 'getTenantRentalRecords'
    }),
    closeManageTenantForm () {
      this.$emit('closeManageTenantForm', false)
    },
    propertySelected (property) {
      this.selectedProperty = property
    },
    setLandlordId () {
      this.selectedLandlord = this.userInfo
    },
    landlordSelected (landlord) {
      this.selectedLandlord = landlord
    },
    getTenantsRecords () {
      const params = {
        'tenant_id': this.tenantInfo.id,
        'landlord_id': this.userInfo.landlord_id
      }
      this.getTenantRentalRecords(params)
    },
    formatRentToNumber () {
      if (this.unitRent) {
        this.unitRent = this.unitRent.replace(/\,/g, '')
        return parseFloat(this.unitRent)
      }
    },
    async moveInTenant () {
      const params = {
        'tenant_id': this.tenantInfo.id,
        'property_id': this.selectedProperty.id,
        'property_name': this.selectedProperty.property_name,
        'landlord_id': this.selectedLandlord.landlord_id,
        'landlord_name': this.selectedLandlord.name,
        'unit_no': this.unitNum,
        'unit_rent': this.formatRentToNumber(),
        'move_in_date': this.moveInDate
      }
      this.valid = this.$refs.form.validate()
      if (!this.valid || !this.hasProperty || !this.hasLandlord) return
      try {
        const success = await this.$store.dispatch('tenants/moveInTenant', params)
        if (success) {
          this.getTenantsRecords()
          this.closeManageTenantForm()
        }
      } catch (err) {
        throw err
      }
    }
  },
  created () {
    this.$store.commit('tenants/MOVE_IN_DUPLICATION_ERROR', false)
    if (this.isLandlordRole) {
      this.setLandlordId()
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/components/modalForms';
</style>
