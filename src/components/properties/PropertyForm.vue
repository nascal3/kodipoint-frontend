<template>
  <v-card class="pa-1">
    {{editForm}}
    <v-card-title class="card-title">
      {{edit ? 'Edit Property' : 'Add Property'}}
    </v-card-title>
    <v-card-subtitle class="card-subtitle">
      {{edit ? 'Edit property' : 'Add new property'}}
    </v-card-subtitle>
    <v-card-text>
      <v-form v-model="valid" @submit.prevent="addProperty">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="propertyName"
                label="Property name*"
                v-validate="'required'"
                name="propertyName"
                :error="errors.has('propertyName')"
            ></v-text-field>
            <transition name="fade">
              <span class="input-error" v-if="errors.has('propertyName')">
                Please enter property name
              </span>
            </transition>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
                v-model="propertyType"
                :items="properties"
                label="Property Type"
                class="propertySelector"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="lrNumber"
                label="LR number*"
                v-validate="'required'"
                name="lrNumber"
                :error="errors.has('lrNumber')"
            ></v-text-field>
            <transition name="fade">
              <span class="input-error" v-if="errors.has('lrNumber')">
                Please enter LR Number
              </span>
            </transition>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="nosUnits"
                label="Number of units*"
                v-validate="'required|max:4'"
                name="nosUnits"
                data-vv-as="number of units"
                v-mask="['####']"
                :error="errors.has('nosUnits')"
            ></v-text-field>
            <transition name="fade">
            <span class="input-error" v-if="errors.has('nosUnits')">
              {{ errors.first('nosUnits') }}
            </span>
            </transition>
          </v-col>
        </v-row>
        <div class="contact-title">Contact person</div>
        <v-radio-group v-model="contact" row>
          <v-radio label="Landlord" color="primary" value="landlord"></v-radio>
          <v-radio label="Other" color="primary" value="other"></v-radio>
        </v-radio-group>
        <transition name="fade">
          <section v-if="contact === 'other'">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                    v-model="contactPerson"
                    label="Contacts' name*"
                    v-validate="'required'"
                    name="contactPerson"
                    :error="errors.has('contactPerson')"
                ></v-text-field>
                <transition name="fade">
                  <span class="input-error" v-if="errors.has('contactPerson')">
                    Please insert contacts' name
                  </span>
                </transition>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                    v-model="contactPhone"
                    label="Contacts' phone number*"
                    v-validate="'required|min:17 '"
                    name="contactPhone"
                    persistent-hint
                    :error="errors.has('contactPhone')"
                    data-vv-as="contacts' phone number"
                    v-mask="['(+###) ####-#####']"
                ></v-text-field>
                <transition name="fade">
                  <div class="input-error" v-if="errors.has('contactPhone')">
                    {{ errors.first('contactPhone') }}
                  </div>
                </transition>
              </v-col>
            </v-row>
          </section>
        </transition>
        <v-combobox
          multiple
          v-model="services"
          label="Property services"
          append-icon
          chips
          deletable-chips
          class="tag-input"
          :search-input.sync="search"
          @keyup.tab="updateTags"
          @paste="updateTags">
        </v-combobox>
        <v-file-input
            prepend-icon="mdi-camera"
            :rules="UploadImageRules"
            show-size
            accept="image/*"
            label="Property Image"
        >
        </v-file-input>
        <v-textarea
            name="description"
            label="Property description"
            v-model="description"
        ></v-textarea>
        <span class="input-hint">
          After each service typed press enter button.
        </span>
        <v-btn
          type="submit"
          :loading="showLoader"
          :disabled="showLoader"
          class="btn-text"
          block
          color="primary"
        >
          Save property
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AddProperty',
  props: {
    edit: {
      type: Boolean,
      default: false,
      required: true
    },
    propertyInfo: {
      type: Object
    }
  },
  data: () => ({
    valid: false,
    propertyName: '',
    contact: 'landlord',
    contactPerson: '',
    contactPhone: '',
    lrNumber: '',
    nosUnits: '',
    description: '',
    services: ['garbage collection', 'water', 'security'],
    items: [],
    search: '',
    propertyType: 'Apartments',
    properties: [
      'Apartments',
      'Business premises',
      'Apartments & Business premises',
      'Warehouse'
    ],
    UploadImageRules: [
      value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!'
    ]
  }),
  computed: {
    ...mapGetters('property', {
      showLoader: 'showLoader',
      showErrorState: 'showErrorState'
    }),
    editForm () {
      console.log('NAME', this.propertyInfo)
      if (this.edit) {
        this.updateFormValues(this.propertyInfo)
        // console.log('NAME', this.propertyInfo)
      }
      return this.edit
    }
  },
  methods: {
    updateTags () {
      this.$nextTick(() => {
        this.services.push(...this.search.split(','))
        this.$nextTick(() => {
          this.search = ''
        })
      })
    },
    updateFormValues (property) {
      if (!property) {
        this.resetFormValues()
      } else if (property) {
        this.propertyName = property.property_name
      }
    },
    resetFormValues () {
      this.propertyName = ''
    },
    async addProperty () {
      const params = {
        'property_name': this.propertyName,
        'contact_person': this.contactPerson,
        'phone': this.contactPhone,
        'lr_nos': this.lrNumber,
        'nos_units': this.nosUnits,
        'description': this.description,
        'property_services': this.services,
        'property_type': this.propertyType
      }
      try {
        await this.$validator.validateAll()
        console.log('ola', params)
      } catch (e) {
        throw new Error(e.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/layout/propertyForm';
</style>
