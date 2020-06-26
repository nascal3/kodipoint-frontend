<template>
    <v-card class="modal-info-form" light>
        <v-card-title class="heading">
            <div class="title">
                Manage Tenant
            </div>
            <v-icon class="close-icon" color="primary" @click="closeForm">
                mdi-close
            </v-icon>
<!--            <v-progress-linear-->
<!--                v-if="!userInfoLoaded && edit"-->
<!--                indeterminate-->
<!--                color="primary"-->
<!--            ></v-progress-linear>-->
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
                        <dynamic-select
                            :options="properties"
                            @search="onSearchProperty"
                            option-value="id"
                            option-text="property_name"
                            placeholder="Type to search"
                            v-model="selectedProperty"
                        />
                        <infinite-loading
                            class="propertyInfiniteLoader"
                            :identifier="infiniteId"
                            @infinite="getProperties"
                        />
                        <div class="input-hint">
                            Type property name or click to select property.
                        </div>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select
                            :items="properties.property_name"
                            label="Properties"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import DynamicSelect from 'vue-dynamic-select'
import InfiniteLoading from 'vue-infinite-loading'
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
    DynamicSelect,
    InfiniteLoading
  },
  data: () => ({
    valid: false,
    selectedProperty: {},
    infiniteId: +new Date()
  }),
  computed: {
    ...mapGetters({
      properties: ['property/properties']
    })
  },
  methods: {
    ...mapActions({
      getAllProperties: 'property/getAllProperties',
      searchProperties: 'property/searchProperties'
    }),
    closeForm () {
      this.$emit('closeModal', false)
    },
    getProperties ($event) {
      this.getAllProperties({ ...$event })
    },
    onSearchProperty () {

    },
    moveInTenant () {

    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/components/modalForms';
</style>
