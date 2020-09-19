<template>
    <section>
        <v-radio-group v-model="role" row>
            <v-radio label="Landlord" value="landlord"></v-radio>
            <v-radio label="Tenant" value="tenant"></v-radio>
            <v-radio label="Both" value="landlordTenant"></v-radio>
        </v-radio-group>

        <google-login
            class="google-register-btn"
            :params="params"
            :onSuccess="googleRegisterSuccess"
            :onFailure="googleRegisterFailure"
        >
            <v-img class="google-logo" :src="require('@/assets/images/google-logo.png')"></v-img>
            <span>Register with Google</span>
        </google-login>

        <v-form ref="form" v-model="valid" @submit.prevent="onRegister">

            <v-text-field
                v-model="name"
                name="name"
                label="Full name*"
                :rules="[rules.nameRequired]"
            ></v-text-field>

            <v-text-field
                v-model="phone"
                label="Phone number*"
                name="phone"
                persistent-hint
                :rules="[rules.phoneRequired, rules.phoneNumberMin]"
                v-mask="['+### #########']"
            ></v-text-field>

            <v-text-field
                v-model="email"
                name="email"
                label="Email*"
                :rules="[rules.emailRequired, rules.validEmail]"
            ></v-text-field>
            <transition name="fade">
                <div class="input-error" v-if="authEmailDuplicationError">
                    The following email is already registered!
                </div>
            </transition>

            <v-text-field
                :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                v-model="password"
                name="password"
                label="Password*"
                :rules="[rules.passwordRequired]"
                @input="checkPasswordMatch"
                @click:append="show1 = !show1"
            ></v-text-field>

            <v-text-field
                :type="show2 ? 'text' : 'password'"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                v-model="repeatPassword"
                name="repeatPassword"
                label="Re-type Password*"
                :rules="[rules.retypePasswordRequired]"
                @input="checkPasswordMatch"
                :error="passwordMatch"
                @click:append="show2 = !show2"
            ></v-text-field>
            <transition name="fade">
                <span class="retype-input-error" v-if="passwordMatch">Password you entered doesn't match</span>
            </transition>

            <div class="terms">
                By registering you agree to
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <a
                           target="_blank"
                           href="/terms"
                           @click.stop
                           v-on="on"
                        >
                            Terms & Conditions
                        </a>
                    </template>
                    Opens in new window
                </v-tooltip>
                for using this website.
            </div>

            <v-btn
                type="submit"
                :loading="showLoader"
                :disabled="showLoader || !valid"
                class="signIn-btn"
                depressed
                block
                color="secondary"
            >
                Sign up
            </v-btn>
        </v-form>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import GoogleLogin from 'vue-google-login'

export default {
  name: 'RegistrationForm',
  data: () => ({
    valid: false,
    show1: false,
    show2: false,
    email: '',
    name: '',
    phone: '',
    passwordMatch: false,
    repeatPassword: '',
    password: '',
    role: 'landlord',
    params: {
      client_id: process.env.OAUTH_ID
    },
    rules: {
      nameRequired: value => !!value || 'Full name required',
      emailRequired: value => !!value || 'Email address required',
      validEmail: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid email address.'
      },
      passwordRequired: value => !!value || 'Please enter a password',
      retypePasswordRequired: value => !!value || 'Please re typed the password. ',
      phoneRequired: value => !!value || 'Please insert a phone number',
      phoneNumberMin: value => value.length >= 14 || 'Please insert complete phone number! e.g +254 723456789'
    }
  }),
  components: {
    GoogleLogin
  },
  computed: {
    ...mapGetters('auth', {
      authEmailDuplicationError: 'authEmailDuplicationError',
      showLoader: 'showLoader'
    })
  },
  methods: {
    checkPasswordMatch () {
      this.passwordMatch = this.password !== this.repeatPassword
    },
    async googleRegisterSuccess (googleUser) {
      // This only gets the user information: id, name, imageUrl and email
      console.log('>>>', googleUser.getBasicProfile())
    },
    googleRegisterFailure () {

    },
    async onRegister () {
      const userData = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        password: this.password,
        role: this.role
      }
      if (this.passwordMatch) return
      this.valid = this.$refs.form.validate()
      if (!this.valid) return
      try {
        const response = await this.$store.dispatch('auth/createUser', userData)
        if (response) {
          response.user.role === 'tenant'
            ? await this.$router.replace('/tenant')
            : await this.$router.replace('/profile')

          const firstName = response.user.name.split(' ')[0]
          const options = { icon: 'check_circle_outline' }
          this.$toasted.show(`Welcome ${firstName}`, options)
        }
      } catch (e) {
        throw new Error(e.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/registrationForm';
</style>
