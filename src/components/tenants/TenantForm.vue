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
      ]
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
      try {
        const valid = await this.$validator.validateAll()
        if (!valid || !this.validFile) return
        const formData = new FormData()
        formData.append('file', this.image)
        formData.append('data', JSON.stringify(params))
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
