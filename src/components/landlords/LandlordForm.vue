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
      <v-form ref="form"  enctype="multipart/form-data" v-model="valid" @submit.prevent="addLandlord">
        <div class="section-title">Personal information</div>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="landlordName"
                label="Landlord name*"
                name="landlordName"
                :rules="[rules.nameRequired]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="nationalID"
              label="National ID/ Passport number*"
              name="nationalID"
              :rules="[rules.nationalIdRequired]"
              :error="userIdDuplicationError"
            ></v-text-field>
            <transition name="fade">
              <div class="input-error" v-if="userIdDuplicationError">
                The following national ID is already be registered
              </div>
            </transition>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="email"
                label="email*"
                name="email"
                :rules="[rules.emailRequired, rules.validEmail]"
                :error="userEmailDuplicationError"
            ></v-text-field>
            <transition name="fade">
              <div class="input-error" v-if="userEmailDuplicationError">
                The following email is already registered to another user
              </div>
            </transition>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="phone"
              label="Phone number*"
              name="phone"
              persistent-hint
              :rules="[rules.phoneRequired, rules.phoneNumberMin]"
              v-mask="['(+###) #### #####']"
            ></v-text-field>
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
              name="kraPIN"
              :rules="[rules.kraPINRequired]"
              :error="kraPinDuplicationError"
            ></v-text-field>
            <transition name="fade">
              <div class="input-error" v-if="kraPinDuplicationError">
                The following KRA Pin is already be registered
              </div>
            </transition>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="bankName"
              label="Bank name*"
              name="bankName"
              :rules="[rules.bankNameRequired]"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="bankBranch"
              label="Bank branch*"
              name="bankBranch"
              :rules="[rules.bankBranchRequired]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="bankAcc"
              label="Bank account number*"
              name="bankAcc"
              :rules="[rules.bankAccNumberRequired]"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="bankSwift"
              label="Bank SWIFT Code"
              name="bankSwift"
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="section-title">Landlord picture</div>
        <v-row>
          <v-col cols="12" md="6" class="d-flex justify-center align-center">
            <div class="upload-picture-section d-flex justify-center align-center flex-column">
              <upload-image @setImage="setImage" />
            </div>
          </v-col>
          <v-col cols="12" md="6" class="d-flex justify-center">
            <v-avatar class="modal-data-image">
              <v-img :src="imageSource(landlordData)"></v-img>
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
import UploadImage from '@/helpers/UploadImage'
import { mapActions, mapGetters } from 'vuex'
import userProfileAvatar from '@/mixins/userProfileAvatar'

export default {
  name: 'AddProperty',
  mixins: [userProfileAvatar],
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    landlordInfo: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    UploadImage
  },
  data: function () {
    return {
      valid: false,
      landlordData: this.landlordInfo,
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
      image: null,
      validFile: true,
      btnColor: 'secondary',
      role: { text: 'Landlord', value: 'landlord' },
      roles: [
        { text: 'Landlord', value: 'landlord' },
        { text: 'Landlord & Tenant', value: 'landlordTenant' }
      ],
      rules: {
        nameRequired: value => !!value || 'Full name required',
        nationalIdRequired: value => !!value || 'Nation ID or Passport number required',
        kraPINRequired: value => !!value || 'Please enter landlords\' KRA Pin',
        emailRequired: value => !!value || 'email address required',
        validEmail: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid email address.'
        },
        bankNameRequired: value => !!value || 'Please enter bank name',
        bankBranchRequired: value => !!value || 'Please insert bank branch',
        bankAccNumberRequired: value => !!value || 'Please insert bank account number',
        phoneRequired: value => !!value || 'Please insert a phone number',
        phoneNumberMin: value => value.length >= 17 || 'Please insert complete phone number! e.g (+254) 7234 56789'
      }
    }
  },
  computed: {
    ...mapGetters({
      showLoader: ['property/showLoader'],
      showErrorState: ['property/showErrorState'],
      landlordUserInfo: ['auth/singleUser'],
      userEmailDuplicationError: ['auth/userDuplicationError'],
      userIdDuplicationError: ['landlord/userIdDuplicationError'],
      kraPinDuplicationError: ['landlord/kraPinDuplicationError']
    }),
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
    setImage (values) {
      this.image = values.image
      this.validFile = values.validImage
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
      this.landlordName = ''
      this.phone = ''
      this.email = ''
      this.nationalID = ''
      this.kraPIN = ''
      this.bankName = ''
      this.bankBranch = ''
      this.bankAcc = ''
      this.bankSwift = ''
      this.image = ''
      this.role = { roleText: 'Landlord', roleValue: 'landlord' }
      this.landlordData = {}
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
      this.valid = this.$refs.form.validate()
      if (!this.valid || !this.validFile) return
      try {
        const formData = new FormData()
        formData.append('file', this.image)
        formData.append('data', JSON.stringify(params))
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
