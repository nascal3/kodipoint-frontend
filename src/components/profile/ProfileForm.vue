<template>
    <v-card class="profile-form-card" light>
        <v-form ref="form" enctype="multipart/form-data" v-model="valid" @submit.prevent="editProfile">
            <div class="section-title">Personal information</div>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="fullName"
                        label="Full name*"
                        name="landlordName"
                        :rules="[rules.nameRequired]"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="email"
                        name="email"
                        label="Email*"
                        :rules="[rules.emailRequired, rules.validEmail]"
                    ></v-text-field>
                    <transition name="fade">
                        <div class="input-error" v-if="emailDuplicationError">
                            The following email is already registered!
                        </div>
                    </transition>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="phone"
                        label="Phone number*"
                        name="phone"
                        persistent-hint
                        v-mask="['+### #########']"
                        :rules="[rules.phoneRequired, rules.phoneNumberMin]"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="postalAddress"
                        label="P.O Box Address"
                        name="postalAddress"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col md="6" cols="12">
                    <v-text-field
                        v-model="nationalID"
                        label="National ID/ Passport number*"
                        name="nationalID"
                        :rules="[rules.nationalIdRequired]"
                        :error="userIdDuplicationError"
                    ></v-text-field>
                    <transition name="fade">
                        <div class="input-error" v-if="userIdDuplicationError">
                            The following national ID or passport number is already registered
                        </div>
                    </transition>
                </v-col>
            </v-row>
            <section v-if="isLandlord">
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
                            The following KRA Pin is already registered
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
            </section>

            <div class="section-title">Profile picture</div>
            <v-row>
                <v-col cols="12" md="6" class="d-flex justify-center align-center">
                    <div class="upload-picture-section d-flex justify-center align-center flex-column">
                        <upload-image @setImage="setImage" />
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="12">
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
            </v-row>
        </v-form>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UploadImage from '@/helpers/UploadImage'

export default {
  name: 'ProfileForm',
  props: {
    userInfo: {
      type: Object,
      required: true
    },
    tokenData: {
      type: Object,
      required: true
    }
  },
  components: {
    UploadImage
  },
  data: () => ({
    valid: false,
    fullName: '',
    phone: '',
    email: '',
    postalAddress: '',
    nationalID: '',
    kraPIN: '',
    bankName: '',
    bankBranch: '',
    bankAcc: '',
    bankSwift: '',
    image: null,
    validFile: true,
    rules: {
      nameRequired: value => !!value || 'Full name required',
      nationalIdRequired: value => !!value || 'Nation ID or Passport number required',
      kraPINRequired: value => !!value || 'Please enter landlords\' KRA Pin',
      bankNameRequired: value => !!value || 'Please enter bank name',
      bankBranchRequired: value => !!value || 'Please insert bank branch',
      bankAccNumberRequired: value => !!value || 'Please insert bank account number',
      phoneRequired: value => !!value || 'Please insert a phone number',
      phoneNumberMin: value => value.length >= 14 || 'Please insert complete phone number! e.g +254 723456789',
      emailRequired: value => !!value || 'Email address required',
      validEmail: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid email address.'
      }
    }
  }),
  watch: {
    userInfo (userData) {
      this.setFormValues(userData)
    }
  },
  computed: {
    ...mapGetters('profile', {
      showLoader: 'showLoader',
      userIdDuplicationError: 'userIdDuplicationError',
      kraPinDuplicationError: 'kraPinDuplicationError',
      emailDuplicationError: 'emailDuplicationError'
    }),
    isLandlord () {
      return this.tokenData.user.role === 'landlord' || this.tokenData.user.role === 'landlordTenant'
    }
  },
  methods: {
    ...mapActions('profile', {
      editUserProfile: 'editUserProfile'
    }),
    setImage (values) {
      this.image = values.image
      this.validFile = values.validImage
    },
    setFormValues (userInfo) {
      this.fullName = userInfo.name
      this.phone = userInfo.phone
      this.email = userInfo.email
      this.postalAddress = userInfo.postal_address
      this.nationalID = userInfo.national_id
      this.kraPIN = userInfo.kra_pin
      this.bankName = userInfo.bank_name
      this.bankBranch = userInfo.bank_branch
      this.bankAcc = userInfo.bank_acc
      this.bankSwift = userInfo.bank_swift
    },
    async editProfile () {
      const params = {
        'name': this.fullName,
        'national_id': this.nationalID,
        'phone': this.phone,
        'email': this.email,
        'postal_address': this.postalAddress,
        'kra_pin': this.kraPIN,
        'bank_name': this.bankName,
        'bank_branch': this.bankBranch,
        'bank_acc': this.bankAcc,
        'bank_swift': this.bankSwift
      }
      this.valid = this.$refs.form.validate()
      if (!this.valid) return
      try {
        const formData = new FormData()
        formData.append('file', this.image)
        formData.append('data', JSON.stringify(params))
        const success = await this.editUserProfile(formData)
        if (success) {
          const options = { icon: 'check_circle_outline' }
          this.$toasted.success(`Profile successfully updated`, options)
          await this.$store.dispatch('configs/getLoggedInUserInfo')
        }
      } catch (error) {
        const options = { icon: 'error_outline' }
        this.$toasted.error(`Oops! an error occurred`, options)
        throw (error)
      }
    }
  },
  mounted () {
    this.setFormValues(this.userInfo)
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/profileForm';
</style>
