<template>
    <v-card class="change-password-card" light>
        <v-form ref="form" v-model="valid" @submit.prevent="changePassword">
            <div class="section-title">Change Password</div>
            <v-row>
                <v-col cols="12" md="12">
                    <transition name="fade">
                        <div class="retype-input-error" v-if="!passwordIsNew">
                            Current password and New password are the same!
                        </div>
                    </transition>

                    <v-text-field
                        :type="show3 ? 'text' : 'password'"
                        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                        v-model="currentPassword"
                        label="Current Password*"
                        name="currentPassword"
                        :rules="[rules.currentPasswordRequired]"
                        :error="wrongCurrentPasswordError"
                        @click:append="show3 = !show3"
                    ></v-text-field>
                    <transition name="fade">
                        <div class="retype-input-error" v-if="wrongCurrentPasswordError">
                            Current password entered is wrong
                        </div>
                    </transition>

                    <v-text-field
                        :type="show1 ? 'text' : 'password'"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        v-model="newPassword"
                        name="newPassword"
                        label="New Password*"
                        :rules="[rules.passwordRequired]"
                        @input="checkPasswordMatch"
                        @click:append="show1 = !show1"
                    ></v-text-field>

                    <v-text-field
                        :type="show2 ? 'text' : 'password'"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        v-model="retypePassword"
                        name="repeatPassword"
                        label="Re-type Password*"
                        :rules="[rules.retypePasswordRequired]"
                        @input="checkPasswordMatch"
                        :error="passwordMatch"
                        @click:append="show2 = !show2"
                    ></v-text-field>
                    <transition name="fade">
                        <div class="retype-input-error" v-if="passwordMatch">Password you entered doesn't match</div>
                    </transition>

                    <v-btn
                        type="submit"
                        :loading="showLoader"
                        :disabled="showLoader"
                        class="signIn-btn"
                        depressed
                        block
                        color="secondary"
                    >
                        Change Password
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ChangePasswordForm',
  data: () => ({
    valid: false,
    show1: false,
    show2: false,
    show3: false,
    passwordIsNew: true,
    currentPassword: '',
    newPassword: '',
    retypePassword: '',
    passwordMatch: false,
    rules: {
      currentPasswordRequired: value => !!value || 'Current password required',
      passwordRequired: value => !!value || 'Please enter a password',
      retypePasswordRequired: value => !!value || 'Please re typed the password. '
    }
  }),
  computed: {
    ...mapGetters('profile', {
      showLoader: 'changePasswordLoader',
      wrongCurrentPasswordError: 'wrongCurrentPasswordError'
    })
  },
  methods: {
    checkPasswordMatch () {
      this.passwordMatch = this.newPassword !== this.retypePassword
    },
    checkPasswordIsNew () {
      this.passwordIsNew = this.newPassword !== this.currentPassword
      return this.passwordIsNew
    },
    async changePassword () {
      const userData = {
        'oldPassword': this.currentPassword,
        'newPassword': this.newPassword
      }
      if (this.passwordMatch) return
      this.valid = this.$refs.form.validate()
      if (!this.valid) return
      if (!this.checkPasswordIsNew()) return
      try {
        const success = await this.$store.dispatch('profile/changePassword', userData)
        if (success) {
          const options = { icon: 'check_circle_outline' }
          this.$toasted.success(`Password successfully updated`, options)
        }
      } catch (error) {
        const options = { icon: 'error_outline' }
        this.$toasted.error(`Oops! an error occurred`, options)
        throw error
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/changePasswordForm';
</style>
