<template>
  <v-card class="pa-1">
    <section class="header-section">
      <v-card-title class="card-title">
        {{editForm ? 'Edit Landlord' : 'Add landlord'}}
      </v-card-title>
      <v-icon class="close-icon" color="primary" @click="closeForm(false)">
        mdi-close
      </v-icon>
    </section>
    <v-card-text>
      <v-form enctype="multipart/form-data" v-model="valid" @submit.prevent="addProperty">
        <div class="section-title">Personal information</div>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="landlordName"
                label="Landlord name*"
                v-validate="'required'"
                name="landlordName"
                :error="errors.has('landlordName')"
            ></v-text-field>
            <transition name="fade">
              <span class="input-error" v-if="errors.has('landlordName')">
                Please enter landlords' name
              </span>
            </transition>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="nationalID"
              label="National ID*"
              v-validate="'required'"
              name="nationalID"
              data-vv-as="national ID"
              :error="errors.has('nationalID')"
            ></v-text-field>
            <transition name="fade">
            <span class="input-error" v-if="errors.has('nationalID')">
              {{ errors.first('nationalID') }}
            </span>
            </transition>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="email"
                label="email*"
                v-validate="'required|email'"
                name="email"
                :error="errors.has('email')"
            ></v-text-field>
            <transition name="fade">
              <span class="input-error" v-if="errors.has('email')">
                {{ errors.first('email') }}
              </span>
            </transition>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="phone"
              label="Phone number*"
              v-validate="'required|min:17 '"
              name="phone"
              persistent-hint
              :error="errors.has('phone')"
              v-mask="['(+###) ####-#####']"
            ></v-text-field>
            <transition name="fade">
              <div class="input-error" v-if="errors.has('phone')">
                {{errors.items[0].rule === 'min' ? 'Please insert complete phone number!' : 'Please insert a phone number!' }}
              </div>
            </transition>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              v-model="role"
              :items="roles"
              item-text="roleText"
              item-value="roleValue"
              label="Role Type"
              class="roleSelector"
            ></v-select>
          </v-col>
        </v-row>
        <div class="section-title">Financial information</div>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="kraPIN"
              label="KRA Pin*"
              v-validate="'required'"
              name="kraPIN"
              :error="errors.has('kraPIN')"
            ></v-text-field>
            <transition name="fade">
              <span class="input-error" v-if="errors.has('kraPIN')">
                Please enter landlords' KRA Pin
              </span>
            </transition>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="bankName"
              label="Bank name*"
              v-validate="'required'"
              name="bankName"
              data-vv-as="bank name"
              :error="errors.has('bankName')"
            ></v-text-field>
            <transition name="fade">
            <span class="input-error" v-if="errors.has('bankName')">
              {{ errors.first('bankName') }}
            </span>
            </transition>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="bankBranch"
              label="Bank branch*"
              v-validate="'required'"
              name="bankBranch"
              data-vv-as="bank branch"
              :error="errors.has('bankBranch')"
            ></v-text-field>
            <transition name="fade">
              <span class="input-error" v-if="errors.has('bankBranch')">
                {{ errors.first('bankBranch') }}
              </span>
            </transition>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="bankAcc"
              label="Bank account number*"
              v-validate="'required'"
              name="bankAcc"
              data-vv-as="bank account number"
              :error="errors.has('bankAcc')"
            ></v-text-field>
            <transition name="fade">
              <span class="input-error" v-if="errors.has('bankAcc')">
                {{ errors.first('bankAcc') }}
              </span>
            </transition>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="bankSwift"
              label="Bank SWIFT Code*"
              v-validate="'required'"
              name="bankSwift"
              data-vv-as="bank SWIFT Code"
              :error="errors.has('bankSwift')"
            ></v-text-field>
            <transition name="fade">
              <span class="input-error" v-if="errors.has('bankSwift')">
                {{ errors.first('bankSwift') }}
              </span>
            </transition>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-file-input
                ref="landlordPicture"
                prepend-icon="mdi-camera"
                :value=imageValue
                :rules="UploadImageRules"
                :error="!validFile"
                chips
                show-size
                accept="image/*"
                label="Upload landlord picture"
                @change="onSelect"
            >
            </v-file-input>
            <transition name="fade">
              <span class="file-error" v-if="!validFile">
                Please upload an image file.
              </span>
            </transition>
          </v-col>
          <v-col cols="12" md="6" class="d-flex justify-center">
            <v-img
              v-if="edit"
              class="modal-landlord-image"
              :src="imageSource"
            ></v-img>
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
              :color="btnColor"
            >
              {{ editForm ? 'Save Changes' : 'Add Landlord'}}
            </v-btn>
          </v-col>
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
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
    landlordName: '',
    phone: '',
    email: '',
    nationalID: '',
    kraPIN: '',
    bankName: '',
    bankBranch: '',
    bankAcc: '',
    bankSwift: '',
    file: '',
    imageValue: [],
    validFile: true,
    placeholderImage: require(`@/assets/images/avatar.jpg`),
    btnColor: 'secondary',
    role: { roleText: 'Landlord', roleValue: 'landlord' },
    roles: [
      { roleText: 'Landlord', roleValue: 'landlord' },
      { roleText: 'Landlord/Tenant', roleValue: 'landlord/tenant' }
    ],
    UploadImageRules: [
      value => !value || value.size < 1000000 || 'Image size should be less than 1 MB!'
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
    },
    imageSource () {
      const imagePath = this.propertyInfo ? this.propertyInfo.property_img : null
      if (!imagePath) return this.placeholderImage
      const baseURL = process.env.BASE_URL
      return `${baseURL}/file${imagePath}`
    }
  },
  methods: {
    ...mapActions('property', {
      addNewProperty: 'addNewProperty'
    }),
    onSelect () {
      this.file = this.$refs.landlordPicture.internalValue
      if (this.file) this.validUploadedFile(this.file.type)
    },
    validUploadedFile (fileType) {
      this.validFile = fileType.split('/')[0] === 'image'
    },
    closeForm (formSubmitted) {
      const payload = {
        'openState': false,
        'formSubmitted': formSubmitted
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
      this.description = property.description
      this.services = property.property_services.split(',')
      this.propertyType = property.property_type
    },
    async clearFormValues () {
      this.btnColor = 'secondary'
      this.contact = 'landlord'
      this.services = ['garbage collection', 'water', 'security']
      this.propertyType = 'Apartments'
      await setTimeout(() => {
        this.propertyName = ''
        this.lrNumber = ''
        this.nosUnits = ''
        this.description = ''
        this.file = ''
        this.imageValue = []
        this.contactPerson = ''
        this.contactPhone = ''
      }, 500)
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
        'property_type': this.propertyType,
        'edit': this.edit
      }
      try {
        const valid = await this.$validator.validateAll()
        if (!valid || !this.validFile) return
        const formData = new FormData()
        formData.append('file', this.file)
        formData.append('json', JSON.stringify(params))
        const success = await this.addNewProperty(formData)
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
  @import 'src/styles/layout/landlordForm';
</style>
