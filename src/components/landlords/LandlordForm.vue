<template>
  <v-card class="modal-info-form" light>
    <v-card-title class="heading">
      <div class="title">
        {{edit ? 'Edit Landlord' : 'Add landlord'}}
      </div>
      <v-icon class="close-icon" color="primary" @click="closeForm(false)">
        mdi-close
      </v-icon>
      <v-progress-linear
        v-if="!userInfoLoaded && edit"
        indeterminate
        color="primary"
      ></v-progress-linear>
    </v-card-title>
    <v-card-text class="content">
      <div class="display-1 d-flex justify-center align-center" v-if="!userInfoLoaded && edit">
        Loading data ...
      </div>
      <v-form enctype="multipart/form-data" v-model="valid" @submit.prevent="addLandlord">
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
              label="National ID/ Passport number*"
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
            <transition name="fade">
              <span class="input-error" v-if="userIdDuplicationError">
                The following national ID or KRA Pin may already be registered
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
                :error="errors.has('email') || userDuplicationError"
            ></v-text-field>
            <transition name="fade">
              <span class="input-error" v-if="errors.has('email')">
                {{ errors.first('email') }}
              </span>
            </transition>
            <transition name="fade">
              <span class="input-error" v-if="userDuplicationError">
                The following email is already registered to another user
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
              v-mask="['(+###) #### #####']"
            ></v-text-field>
            <transition name="fade">
              <div class="input-error" v-if="errors.has('phone')">
                {{
                  errors.items[0].rule === 'min'
                    ? 'Please insert complete phone number! e.g (+254) 7234 56789'
                    : 'Please insert a phone number'
                }}
              </div>
            </transition>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              v-model="role"
              :items="roles"
              item-text="text"
              item-value="value"
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
            <transition name="fade">
              <span class="input-error" v-if="userIdDuplicationError">
                The following KRA Pin or national ID may already be registered
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
              label="Bank SWIFT Code"
              name="bankSwift"
              data-vv-as="bank SWIFT Code"
              :error="errors.has('bankSwift')"
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="section-title">Landlord picture</div>
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
            <v-avatar class="modal-data-image" color="primary">
              <v-img
                v-if="edit"
                :src="imageSource"
              ></v-img>
            </v-avatar>
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
              {{ edit ? 'Save Changes' : 'Add Landlord'}}
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
      default: false
    },
    landlordInfo: {
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
    userID: '',
    imageValue: [],
    validFile: true,
    placeholderImage: require(`@/assets/images/avatar.jpg`),
    btnColor: 'secondary',
    role: { text: 'Landlord', value: 'landlord' },
    roles: [
      { text: 'Landlord', value: 'landlord' },
      { text: 'Landlord & Tenant', value: 'landlordTenant' }
    ],
    UploadImageRules: [
      value => !value || value.size < 1000000 || 'Image size should be less than 1 MB!'
    ]
  }),
  computed: {
    ...mapGetters({
      showLoader: ['property/showLoader'],
      showErrorState: ['property/showErrorState'],
      landlordUserInfo: ['auth/singleUser'],
      userDuplicationError: ['auth/userDuplicationError'],
      userIdDuplicationError: ['landlord/userIdDuplicationError']
    }),
    imageSource () {
      const imagePath = this.landlordInfo ? this.landlordInfo.avatar : null
      if (!imagePath) return this.placeholderImage
      const baseURL = process.env.BASE_URL
      return `${baseURL}/file${imagePath}`
    },
    userInfoLoaded () {
      return Object.keys(this.landlordUserInfo).length
    }
  },
  methods: {
    ...mapActions('landlord', {
      addNewLandlord: 'addNewLandlord'
    }),
    editForm () {
      if (this.edit && Object.keys(this.landlordInfo).length) {
        this.updateFormValues(this.landlordInfo)
      } else {
        this.clearFormValues()
      }
    },
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
    async getUserInfo (userID) {
      await this.$store.dispatch('auth/singleUser', userID)
    },
    async updateFormValues (landlord) {
      this.btnColor = 'primary'
      this.userID = landlord.user_id
      await this.getUserInfo(this.userID)
      this.landlordName = landlord.name
      this.phone = landlord.phone
      this.email = landlord.email
      this.nationalID = landlord.national_id
      this.kraPIN = landlord.kra_pin
      this.bankName = landlord.bank_name
      this.bankBranch = landlord.bank_branch
      this.bankAcc = landlord.bank_acc
      this.bankSwift = landlord.bank_swift
      this.role = {
        text: this.landlordUserInfo.role === 'landlord' ? 'Landlord' : 'Landlord & Tenant',
        value: this.landlordUserInfo.role
      }
    },
    async clearFormValues () {
      this.btnColor = 'secondary'
      await setTimeout(() => {
        this.landlordName = ''
        this.phone = ''
        this.email = ''
        this.nationalID = ''
        this.kraPIN = ''
        this.bankName = ''
        this.bankBranch = ''
        this.bankAcc = ''
        this.bankSwift = ''
        this.imageValue = []
        this.role = { roleText: 'Landlord', roleValue: 'landlord' }
      }, 500)
    },
    async addLandlord () {
      const params = {
        'user_id': this.userID,
        'name': this.landlordName,
        'role': this.role.value || this.role,
        'national_id': this.nationalID,
        'phone': this.phone,
        'email': this.email,
        'kra_pin': this.kraPIN,
        'bank_name': this.bankName,
        'bank_branch': this.bankBranch,
        'bank_acc': this.bankAcc,
        'bank_swift': this.bankSwift,
        'edit': this.edit
      }
      try {
        const valid = await this.$validator.validateAll()
        if (!valid || !this.validFile) return
        const formData = new FormData()
        formData.append('file', this.file)
        formData.append('json', JSON.stringify(params))
        const success = await this.addNewLandlord(formData)
        if (success) {
          this.clearFormValues()
          this.closeForm(success)
        }
      } catch (e) {
        throw new Error(e.message)
      }
    }
  },
  created () {
    this.editForm()
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/components/modalForms';
</style>
