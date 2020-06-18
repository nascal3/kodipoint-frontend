<template>
    <v-card class="profile-form-card" light>
        <v-form enctype="multipart/form-data" v-model="valid" @submit.prevent="editProfile">
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
                        v-model="nationalID"
                        label="National ID/ Passport number*"
                        name="nationalID"
                        :rules="[rules.nationalIdRequired]"
                    ></v-text-field>
                    <transition name="fade">
                      <div class="input-error" v-if="userIdDuplicationError">
                        The following national ID or KRA Pin may already be registered
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
                        v-mask="['(+###) #### #####']"
                        :rules="[rules.phoneRequired, rules.phoneNumberMin]"
                    ></v-text-field>
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
                        ></v-text-field>
                        <transition name="fade">
                          <div class="input-error" v-if="userIdDuplicationError">
                            The following KRA Pin or national ID may already be registered
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
                <div class="section-title">Profile picture</div>
                <v-row>
                    <v-col cols="12" md="6" class="d-flex justify-center align-center">
                        <div class="upload-picture-section d-flex justify-center align-center flex-column">
                            <upload-image @setImage="setImage" />
                        </div>
                    </v-col>
                </v-row>
            </section>

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
import { mapGetters } from 'vuex'
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
      nationalIdRequired: value => !!value || 'nation ID or passport required',
      kraPINRequired: value => !!value || 'Please enter landlords\' KRA Pin',
      bankNameRequired: value => !!value || 'Please enter bank name',
      bankBranchRequired: value => !!value || 'Please insert bank branch',
      bankAccNumberRequired: value => !!value || 'Please insert bank account number',
      phoneRequired: value => !!value || 'Please insert a phone number',
      phoneNumberMin: value => value.length >= 17 || 'Please insert complete phone number! e.g (+254) 7234 56789'
    }
  }),
  watch: {
    userInfo (userData) {
      this.setFormValues(userData)
    }
  },
  computed: {
    ...mapGetters({
      showLoader: ['property/showLoader'],
      showErrorState: ['property/showErrorState'],
      userDuplicationError: ['auth/userDuplicationError'],
      userIdDuplicationError: ['landlord/userIdDuplicationError']
    }),
    isLandlord () {
      return this.tokenData.user.role === 'landlord' || this.tokenData.user.role === 'landlordTenant'
    }
  },
  methods: {
    setImage (values) {
      this.image = values.image
      this.validFile = values.validImage
    },
    setFormValues (userInfo) {
      this.fullName = userInfo.name
      this.phone = userInfo.phone
      this.nationalID = userInfo.national_id
      this.kraPIN = userInfo.kra_pin
      this.bankName = userInfo.bank_name
      this.bankBranch = userInfo.bank_branch
      this.bankAcc = userInfo.bank_acc
      this.bankSwift = userInfo.bank_swift
    },
    editProfile () {

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
