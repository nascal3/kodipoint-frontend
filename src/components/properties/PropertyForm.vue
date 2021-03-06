<template>
  <v-card class="modal-info-form" light>
    <v-card-title  class="heading">
      <div class="header-title">
        {{editForm ? 'Edit Property' : 'Add Property'}}
      </div>
      <v-icon class="close-icon" color="primary" @click="closeForm(false)">
        mdi-close
      </v-icon>
    </v-card-title>
    <v-card-text class="content">
      <v-form ref="form" enctype="multipart/form-data" v-model="valid" @submit.prevent="addProperty">
        <div class="section-title">Property details</div>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="propertyName"
                label="Property name*"
                :rules="[rules.propertyRequired]"
                name="propertyName"
            ></v-text-field>
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
                name="lrNumber"
                :rules="[rules.lrRequired]"
                :error="lrNumberDuplicationError"
            ></v-text-field>
            <transition name="fade">
              <div class="input-error" v-if="lrNumberDuplicationError">
                The following LR number is already registered
              </div>
            </transition>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="nosUnits"
                label="Number of units*"
                :rules="[rules.unitsRequired]"
                name="nosUnits"
                v-mask="['####']"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="titleType"
              label="Title type*"
              name="titleType"
              :rules="[rules.titleTypeRequired]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="ownershipType"
              label="Ownership type*"
              :rules="[rules.ownershipRequired]"
              name="ownership"
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="section-title">Property location</div>
        <div class="section-subtitle">Click on the property location in map to select/set the property location.</div>
        <v-row>
          <v-col cols="12">
            <div class="map-container">
              <div class="location-input">
                <v-text-field
                  v-model="propertyLocation"
                  label="Property location*"
                  :rules="[rules.propertyLocationRequired]"
                  :error="showMapValidationError"
                  name="propertyLocation"
                  class="location-name"
                  readonly
                  solo
                ></v-text-field>
              </div>
              <Map :editLocation="edit" :propertyCoordinates="locationCoordinates" @locationName="setLocationName" />
            </div>
            <transition name="fade">
                <div class="file-error" v-if="showMapValidationError">
                  Please select the property location!
                </div>
            </transition>
          </v-col>
        </v-row>
        <div class="section-title">Contact person</div>
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
                    :rules="[rules.contactRequired]"
                    name="contactPerson"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                    v-model="contactPhone"
                    label="Contacts' phone number*"
                    :rules="[rules.phoneRequired, rules.numberMin]"
                    name="contactPhone"
                    persistent-hint
                    v-mask="['+### #########']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="contactEmail"
                  label="Contacts' email"
                  name="contactEmail"
                  :rules="[rules.validEmail]"
                ></v-text-field>
              </v-col>
            </v-row>
          </section>
        </transition>
        <div class="section-title">Property services</div>
        <v-chip
          v-for="service in servicesSelected"
          class="ma-2"
          label
          close
          color="primary"
          text-color="white"
          close-icon="mdi-delete"
          @click="editServicePrice(service)"
          @click:close="deleteService(service)"
          :key="service.id"
        >
          {{service.service_name}}: {{thousandSeparator(service.service_price)}}/=
        </v-chip>
        <v-dialog
          class="service-price-dialog"
          v-model="servicePriceDialog"
          width="250"
        >
          <property-service-dialog :service-info="selectedService" @showServiceDialog="showServiceDialog"/>
        </v-dialog>
        <v-combobox
          multiple
          v-model="services"
          label="Add property services"
          :items="items"
          chips
          deletable-chips
          hide-selected
          small-chips
          clearable
          class="tag-input">
        </v-combobox>
        <div class="input-hint">
          Press "Enter" after typing a custom service.
        </div>
        <div class="section-title">Property image</div>
        <v-row>
          <v-col cols="12" md="6" class="d-flex justify-center align-center">
            <div class="upload-picture-section d-flex justify-center align-center flex-column">
              <upload-image @setImage="setImage" />
              <transition name="fade">
                <div class="file-error" v-if="!hasImage">
                  Please upload an image.
                </div>
              </transition>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="d-flex justify-center">
            <v-img
              v-if="edit"
              class="modal-data-image"
              :src="imageSource"
            ></v-img>
          </v-col>
        </v-row>
        <v-textarea
            name="description"
            label="Property description"
            v-model="description"
        ></v-textarea>
        <v-row>
          <v-col cols="12" md="6">
            <v-btn
              class="btn-text"
              block
              outlined
              color="default"
              @click="closeForm(false)"
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
              :color="btnColor"
            >
              {{ editForm ? 'Save Changes' : 'Add Property'}}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import PropertyServiceDialog from '@/components/properties/PropertyServiceDialog'
import UploadImage from '@/helpers/UploadImage'
import Map from '@/helpers/Map'
import thousandSeparator from '@/mixins/thousandSeparator'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AddProperty',
  mixins: [thousandSeparator],
  props: {
    edit: {
      type: Boolean,
      default: false,
      required: true
    },
    propertyInfo: {
      type: Object
    },
    landlordInfo: {
      type: Object
    }
  },
  components: {
    PropertyServiceDialog,
    UploadImage,
    Map
  },
  data: () => ({
    valid: false,
    servicePriceDialog: false,
    propertyName: '',
    contact: 'landlord',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    lrNumber: '',
    nosUnits: '',
    description: '',
    services: [],
    servicesSelected: {},
    selectedService: {},
    items: ['Garbage collection', 'Water', 'Security'],
    image: null,
    validFile: true,
    placeholderImage: require(`@/assets/images/noImage.jpg`),
    search: '',
    btnColor: 'secondary',
    propertyType: 'Apartments',
    titleType: '',
    ownershipType: '',
    propertyLocation: '',
    propertyCoordinates: '',
    locationCoordinates: null,
    properties: [
      'Apartments',
      'Business premises',
      'Apartments & Business premises',
      'Warehouse'
    ],
    rules: {
      propertyRequired: value => !!value || 'Property name required',
      titleTypeRequired: value => !!value || 'Property title type required',
      ownershipRequired: value => !!value || 'Property ownership type required',
      propertyLocationRequired: value => !!value || 'Property location required',
      lrRequired: value => !!value || 'Please enter LR Number',
      unitsRequired: value => !!value || 'Please enter number of units',
      contactRequired: value => !!value || 'Please insert contacts\' name',
      phoneRequired: value => !!value || 'Please insert a phone number',
      numberMin: v => v.length >= 14 || 'Please insert complete phone number! e.g +254 723456789',
      validEmail: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid email address.'
      }
    }
  }),
  computed: {
    ...mapGetters({
      lrNumberDuplicationError: ['property/lrNumberDuplicationError'],
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
    },
    imageSource () {
      const imagePath = this.propertyInfo ? this.propertyInfo.property_img : null
      if (!imagePath) return this.placeholderImage
      const apiURL = process.env.API_URL
      return `${apiURL}/file${imagePath}`
    },
    hasImage () {
      if (this.edit) {
        return this.validFile
      }
      return this.image && this.validFile
    },
    showMapValidationError () {
      return !this.propertyLocation.length
    }
  },
  methods: {
    ...mapActions('property', {
      addNewProperty: 'addNewProperty',
      deletePropertyService: 'deletePropertyService'
    }),
    setImage (values) {
      this.image = values.image
      this.validFile = values.validImage
    },
    setLocationName (location) {
      this.propertyLocation = location.name
      this.propertyCoordinates = JSON.stringify(location.coordinates)
    },
    editServicePrice (service) {
      this.servicePriceDialog = true
      this.selectedService = service
    },
    showServiceDialog (payload) {
      const { status, propertyInfo } = payload
      if (Object.keys(propertyInfo).length) this.updateFormValues(propertyInfo)
      this.servicePriceDialog = status
    },
    closeForm (formSubmitted) {
      const payload = {
        'openState': false,
        'formSubmitted': formSubmitted
      }
      this.$emit('closePropertyModal', payload)
    },
    async deleteService (service) {
      try {
        const newPropertyValues = await this.deletePropertyService(service)
        if (newPropertyValues) {
          this.updateFormValues(newPropertyValues)
        }
      } catch (error) {
        throw error
      }
    },
    updateFormValues (property) {
      this.btnColor = 'primary'
      property.contact_person === 'Landlord' ? this.contact = 'landlord' : this.contact = 'other'
      this.contactPerson = property.contact_person
      this.propertyName = property.property_name
      this.contactPerson = property.contact_person
      this.contactPhone = property.phone
      this.contactEmail = property.contact_email
      this.lrNumber = property.lr_nos
      this.nosUnits = property.nos_units
      this.description = property.description
      this.servicesSelected = property.services
      this.propertyType = property.property_type
      this.titleType = property.title_type
      this.ownershipType = property.ownership_type
      this.propertyLocation = property.property_location
      this.locationCoordinates = property.property_coordinates
        ? JSON.parse(property.property_coordinates) : null
    },
    clearFormValues () {
      this.btnColor = 'secondary'
      this.contact = 'landlord'
      this.services = []
      this.servicesSelected = {}
      this.propertyType = 'Apartments'
      this.propertyName = ''
      this.titleType = ''
      this.ownershipType = ''
      this.contactEmail = ''
      this.lrNumber = ''
      this.nosUnits = ''
      this.description = ''
      this.image = ''
      this.contactPerson = ''
      this.contactPhone = ''
    },
    async addProperty () {
      if (this.contact === 'landlord') {
        this.contactPerson = 'Landlord'
      }
      let propertyID = null
      if (this.propertyInfo) {
        propertyID = this.propertyInfo.id
      }
      const userId = this.landlordInfo ? this.landlordInfo.user_id : this.user.id
      const params = {
        'id': propertyID,
        'user_id': userId,
        'property_name': this.propertyName,
        'contact_person': this.contactPerson,
        'phone': this.contactPhone,
        'contact_email': this.contactEmail,
        'lr_nos': this.lrNumber,
        'nos_units': this.nosUnits,
        'description': this.description,
        'property_location': this.propertyLocation,
        'property_coordinates': this.propertyCoordinates,
        'property_services': this.services.join(','),
        'property_type': this.propertyType,
        'title_type': this.titleType,
        'ownership_type': this.ownershipType,
        'edit': this.edit
      }
      this.valid = this.$refs.form.validate()
      if (!this.valid || !this.hasImage) return
      try {
        const formData = new FormData()
        formData.append('file', this.image)
        formData.append('data', JSON.stringify(params))
        const success = await this.addNewProperty(formData)
        if (success) {
          await this.clearFormValues()
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
  @import 'src/styles/components/modalForms';
</style>
