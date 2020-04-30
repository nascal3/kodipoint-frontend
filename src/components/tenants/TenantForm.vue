<template>
  <v-card class="modal-info-form" light>
    <v-card-title class="heading">
      <div class="title">
        {{edit ? 'Edit Tenant' : 'Add Tenant'}}
      </div>
      <v-icon class="close-icon" color="primary" @click="closeForm(false)">
        mdi-close
      </v-icon>
    </v-card-title>
    <v-card-text class="content">
      <v-form enctype="multipart/form-data" v-model="valid" @submit.prevent="addTenant">
        <div class="section-title">Personal information</div>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="tenantName"
                label="Tenant name*"
                v-validate="'required'"
                name="tenantName"
                :error="errors.has('tenantName')"
            ></v-text-field>
            <transition name="fade">
              <span class="input-error" v-if="errors.has('tenantName')">
                Please enter tenants' name
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
            <transition name="fade">
              <span class="input-error" v-if="tenantIdDuplicationError">
                The following national ID is already registered
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
            <v-file-input
                ref="tenantPicture"
                prepend-icon="mdi-camera"
                :value=imageValue
                :rules="UploadImageRules"
                :error="!validFile"
                chips
                show-size
                accept="image/*"
                label="Upload tenant picture"
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
              {{ edit ? 'Save Changes' : 'Add Tenant'}}
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
  name: 'TenantForm',
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    tenantInfo: {
      type: Object
    }
  },
  data: () => ({
    valid: false,
    tenantName: '',
    phone: '',
    email: '',
    nationalID: '',
    file: '',
    userID: '',
    imageValue: [],
    validFile: true,
    placeholderImage: require(`@/assets/images/avatar.jpg`),
    btnColor: 'secondary',
    roles: [
      { text: 'Landlord', value: 'landlord' },
      { text: 'Landlord/Tenant', value: 'landlord/tenant' }
    ],
    UploadImageRules: [
      value => !value || value.size < 1000000 || 'Image size should be less than 1 MB!'
    ]
  }),
  computed: {
    ...mapGetters({
      showLoader: ['tenants/showLoader'],
      showErrorState: ['tenants/showErrorState'],
      userDuplicationError: ['auth/userDuplicationError'],
      tenantIdDuplicationError: ['tenants/tenantIdDuplicationError']
    }),
    imageSource () {
      const imagePath = this.tenantInfo ? this.tenantInfo.avatar : null
      if (!imagePath) return this.placeholderImage
      const baseURL = process.env.BASE_URL
      return `${baseURL}/file${imagePath}`
    }
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
    onSelect () {
      this.file = this.$refs.tenantPicture.internalValue
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
      this.resetFormErrors()
      this.$emit('closeTenantModal', payload)
    },
    resetFormErrors () {
      this.$store.commit('SET_ERROR_STATE', false)
      this.$store.commit('TENANT_ID_DUPLICATION_ERROR', false)
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
      await setTimeout(() => {
        this.tenantName = ''
        this.phone = ''
        this.email = ''
        this.nationalID = ''
        this.imageValue = []
      }, 500)
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
      try {
        const valid = await this.$validator.validateAll()
        if (!valid || !this.validFile) return
        const formData = new FormData()
        formData.append('file', this.file)
        formData.append('json', JSON.stringify(params))
        const success = await this.addNewTenant(formData)
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
