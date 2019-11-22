<template>
  <v-card class="pa-1">
    <section class="header-section">
      <v-card-title class="card-title">
        {{editForm ? 'Edit Property' : 'Add Property'}}
      </v-card-title>
      <v-card-subtitle class="card-subtitle">
        {{editForm ? 'Edit property' : 'Add new property'}}
      </v-card-subtitle>
      <v-icon class="close-icon" color="primary" @click="closeForm(false)">
        mdi-close
      </v-icon>
    </section>
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
                    {{errors.items[0].rule === 'min' ? 'Please insert complete phone number!' : 'Please insert a phone number!' }}
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
            chips
            show-size
            accept="image/png, image/jpeg, image/bmp"
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
          :color="btnColor"
        >
          {{ editForm ? 'Save changes' : 'Add property'}}
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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
    btnColor: 'secondary',
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
    ...mapGetters({
      showLoader: ['property/showLoader'],
      showErrorState: ['property/showErrorState'],
      user: ['auth/user']
    }),
    editForm () {
      if (this.propertyInfo) {
        this.updateFormValues(this.propertyInfo)
      } else if (!this.propertyInfo) {
        this.clearFormValues()
      }
      return this.edit
    }
  },
  methods: {
    ...mapActions('property', {
      addNewProperty: 'addNewProperty'
    }),
    updateTags () {
      this.$nextTick(() => {
        this.services.push(...this.search.split(','))
        this.$nextTick(() => {
          this.search = ''
        })
      })
    },
    closeForm (formSubmited) {
      const payload = {
        'openState': false,
        'editFormType': this.edit && formSubmited
      }
      this.$emit('closeModal', payload)
    },
    updateFormValues (property) {
      this.btnColor = 'primary'
      property.contact_person === 'Landlord' ? this.contact = 'landlord' : this.contact = 'other'
      this.contactPerson = property.contact_person
      this.propertyName = property.property_name
      this.contactPerson = property.contact_person
      this.contactPhone = property.phone
      this.lrNumber = property.lr_nos
      this.nosUnits = property.nos_units
      this.description = property.declaration
      this.services = property.property_services.split(',')
      this.propertyType = property.property_type
    },
    async clearFormValues () {
      this.btnColor = 'secondary'
      this.contact = 'landlord'
      this.services = ['garbage collection', 'water', 'security']
      this.propertyType = 'Apartments'
      this.propertyName = ''
      this.lrNumber = ''
      this.nosUnits = ''
      this.description = ''
      await this.$nextTick(() => {
        this.contactPerson = ''
        this.contactPhone = ''
      })
    },
    async addProperty () {
      if (this.contact === 'landlord') {
        this.contactPerson = 'Landlord'
      }
      let propertyID = null
      if (this.propertyInfo) {
        propertyID = this.propertyInfo.id
      }
      const params = {
        'id': propertyID,
        'user_id': this.user.id,
        'property_name': this.propertyName,
        'contact_person': this.contactPerson,
        'phone': this.contactPhone,
        'lr_nos': this.lrNumber,
        'nos_units': this.nosUnits,
        'description': this.description,
        'property_services': this.services.join(','),
        'property_type': this.propertyType
      }
      try {
        const valid = await this.$validator.validateAll()
        if (!valid) return
        const data = {
          'edit': this.edit,
          'params': params
        }
        const success = await this.addNewProperty(data)
        if (success) {
          this.clearFormValues()
          this.closeForm(success)
        }
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
