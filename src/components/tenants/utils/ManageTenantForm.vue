<template>
    <v-card class="modal-info-form" light>
        <v-card-title class="heading">
            <div class="title">
                Manage Tenant
            </div>
            <v-icon class="close-icon" color="primary" @click="closeForm">
                mdi-close
            </v-icon>
        </v-card-title>
        <v-card-text class="content">
            {{tenantInfo}}
<!--            <div class="display-1 d-flex justify-center align-center" v-if="!userInfoLoaded && edit">-->
<!--                Loading data ...-->
<!--            </div>-->
            <v-form ref="form" enctype="multipart/form-data" v-model="valid" @submit.prevent="moveInTenant">
                <div class="section-title">Select property</div>
                <v-row>
                    <v-col cols="12" md="6">
                        <dynamic-landlord-select @landlordSelect="landlordSelected" />
                        <div class="input-hint">
                            Type landlord name or click to select landlord.
                        </div>
                    </v-col>
                    <v-col cols="12" md="6">
                        <dynamic-properties-select :user_id="selectedLandlord.user_id" @propertySelect="propertySelected" />
                        <div class="input-hint">
                            Type property name or click to select property.
                        </div>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import DynamicLandlordSelect from '@/components/landlords/utils/DynamicLandlordSelect'
import DynamicPropertiesSelect from '@/components/tenants/utils/DynamicPropertiesSelect'

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
    selectedProperty: {},
    selectedLandlord: {}
  }),
  computed: {

  },
  watch: {

  },
  methods: {
    closeForm () {
      this.$emit('closeModal', false)
    },
    propertySelected (property) {
      this.selectedProperty = property
      console.log('prop', this.selectedProperty)
    },
    landlordSelected (landlord) {
      this.selectedLandlord = landlord
      console.log('landy', this.selectedLandlord)
    },
    moveInTenant () {

    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/components/modalForms';
</style>
