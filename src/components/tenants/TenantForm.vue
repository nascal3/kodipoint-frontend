<template>
  <v-card class="modal-info-form" light>
    <v-card-title class="heading">
      <div class="header-title">
        {{edit ? 'Edit Tenant' : 'Add Tenant'}}
      </div>
      <v-icon class="close-icon" color="primary" @click="closeForm(false)">
        mdi-close
      </v-icon>
    </v-card-title>
    <v-card-text class="content">
      <v-form ref="form" enctype="multipart/form-data" v-model="valid" @submit.prevent="addTenant">
        <div class="section-title">Personal information</div>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="tenantName"
                label="Tenant name*"
                name="tenantName"
                :rules="[rules.nameRequired]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="nationalID"
              label="National ID*"
              name="nationalID"
              :rules="[rules.nationalIdRequired]"
            ></v-text-field>
            <transition name="fade">
              <div class="input-error" v-if="tenantIdDuplicationError">
                The following national ID is already registered
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
                :error="userDuplicationError"
            ></v-text-field>
            <transition name="fade">
              <div class="input-error" v-if="userDuplicationError">
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
        <div class="section-title">Tenant picture</div>
        <v-row>
          <v-col cols="12" md="6" class="d-flex justify-center align-center">
            <div class="upload-picture-section d-flex justify-center align-center flex-column">
              <upload-image @setImage="setImage" />
            </div>
          </v-col>
          <v-col cols="12" md="6" class="d-flex justify-center">
            <v-avatar class="modal-data-image">
              <v-img :src="imageSource(tenantData)"></v-img>
            </v-avatar>
          </v-col>
        </v-row>
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
              {{ edit ? 'Save Changes' : 'Add Tenant'}}
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
  name: 'TenantForm',
  mixins: [userProfileAvatar],
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    tenantInfo: {
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
      tenantData: this.tenantInfo,
      tenantName: '',
      phone: '',
      email: '',
      nationalID: '',
      file: '',
      userID: '',
      image: null,
      validFile: true,
      btnColor: 'secondary',
      roles: [
        { text: 'Landlord', value: 'landlord' },
        { text: 'Landlord/Tenant', value: 'landlord/tenant' }
      ],
      rules: {
        nameRequired: value => !!value || 'Full name required',
        nationalIdRequired: value => !!value || 'Nation ID or Passport number required',
        emailRequired: value => !!value || 'email address required',
        validEmail: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid email address.'
        },
        phoneRequired: value => !!value || 'Please insert a phone number',
        phoneNumberMin: value => value.length >= 17 || 'Please insert complete phone number! e.g (+254) 7234 56789'
      }
    }
  },
  computed: {
    ...mapGetters({
      showLoader: ['tenants/showLoader'],
      showErrorState: ['tenants/showErrorState'],
      userDuplicationError: ['auth/userDuplicationError'],
      tenantIdDuplicationError: ['tenants/tenantIdDuplicationError']
    })
  },
  methods: {
    ...mapActions('tenants', {
      addNewTenant: 'addNewTenant'
    }),
    editForm () {
      if (this.edit && Object.keys(this.tenantInfo).length) {
        this.updateFormValues(this.tenantInfo)
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
      this.resetFormErrors()
      this.$emit('closeTenantModal', payload)
    },
    resetFormErrors () {
      this.$store.commit('tenants/SET_ERROR_STATE', false)
      this.$store.commit('tenants/TENANT_ID_DUPLICATION_ERROR', false)
    },
    async getUserInfo (userID) {
      await this.$store.dispatch('auth/singleUser', userID)
    },
    async updateFormValues (tenant) {
      this.btnColor = 'primary'
      this.userID = tenant.user_id
      await this.getUserInfo(this.userID)
      this.tenantName = tenant.name
      this.phone = tenant.phone
      this.email = tenant.email
      this.nationalID = tenant.national_id
    },
    async clearFormValues () {
      this.btnColor = 'secondary'
      this.tenantName = ''
      this.phone = ''
      this.email = ''
      this.nationalID = ''
      this.image = ''
      this.tenantData = {}
    },
    async addTenant () {
      const params = {
        'user_id': this.userID,
        'name': this.tenantName,
        'national_id': this.nationalID,
        'phone': this.phone,
        'email': this.email,
        'edit': this.edit
      }
      this.valid = this.$refs.form.validate()
      if (!this.valid || !this.validFile) return
      try {
        const formData = new FormData()
        formData.append('file', this.image)
        formData.append('data', JSON.stringify(params))
        const success = await this.addNewTenant(formData)
        if (success) {
          this.clearFormValues()
          this.closeForm(success)
        }
      } catch (e) {
        throw e.message
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
