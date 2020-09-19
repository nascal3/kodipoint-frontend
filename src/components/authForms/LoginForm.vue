<template>
  <section>
    <transition name="fade">
      <div class="login-error" v-if="authError">Please confirm that your email or password is correct!</div>
      <div class="login-error" v-if="authGoogleError">You have not registered a google account with us!</div>
    </transition>
    <v-form ref="form" v-model="valid" @submit.prevent="onLogin">
      <v-text-field
        v-model="email"
        name="email"
        label="Email"
        :rules="[rules.emailRequired, rules.validEmail]"
      ></v-text-field>

      <v-text-field
        :type="show ? 'text' : 'password'"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        v-model="password"
        name="password"
        label="Password"
        :rules="[rules.passwordRequired]"
        @click:append="show = !show"
      ></v-text-field>

      <div class="reset-password" @click="overlay = !overlay">
        <span>Forgot password?</span>
      </div>

      <v-overlay light :value="overlay">
        <v-card light class="mx-auto" elevation="12" opacity="0.53">
          <v-card-title>Forgot Password ?</v-card-title>
          <v-card-text>
            Please call <span>+254 718 769 663</span> or <br>
            email <span>info@kodipoint.com</span> for assistance
          </v-card-text>
          <v-card-actions>
            <v-btn class="modal-btn" depressed color="primary" @click="overlay = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-overlay>

      <v-btn
        type="submit"
        :loading="showLoader"
        :disabled="showLoader"
        class="login-btn"
        depressed
        block
        color="primary"
      >
        Sign in
      </v-btn>

      <div class="alternate-text">Or</div>

      <google-login
        :params="params"
        :renderParams="renderParams"
        :onSuccess="googleLoginSuccess"
        :onFailure="googleLoginFailure"
      />
    </v-form>
  </section>
</template>

<script>
import { redirectPage } from '@/services/authGuards'
import { mapGetters } from 'vuex'
import GoogleLogin from 'vue-google-login'

export default {
  name: 'LoginForm',
  data: () => ({
    valid: false,
    show: false,
    email: '',
    password: '',
    overlay: false,
    params: {
      client_id: process.env.OAUTH_ID
    },
    renderParams: {
      width: 384,
      height: 36,
      longtitle: true
    },
    rules: {
      emailRequired: value => !!value || 'Username / email address required',
      validEmail: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid email address.'
      },
      passwordRequired: value => !!value || 'Please insert your password'
    }
  }),
  components: {
    GoogleLogin
  },
  computed: {
    ...mapGetters('auth', {
      authError: 'authError',
      authGoogleError: 'authGoogleError',
      token: 'token',
      showLoader: 'showLoader',
      loggedIn: 'loggedIn'
    })
  },
  methods: {
    async googleLoginSuccess (googleUser) {
      // This only gets the user information: id, name, imageUrl and email
      try {
        await this.$store.dispatch('auth/loginGoogleAuth', googleUser.getBasicProfile())
        const options = { icon: 'check_circle_outline' }
        if (this.loggedIn && this.token) {
          const page = redirectPage(this.token.user.role)
          await this.$router.replace(page)
          const firstName = this.token.user.name.split(' ')[0]
          this.$toasted.info(`Welcome ${firstName}`, options)
        }
      } catch (err) {
        throw err
      }
    },
    googleLoginFailure (googleUser) {
      this.$store.commit('auth/SET_GOOGLE_AUTH_ERROR_STATE', true)
    },
    async onLogin () {
      const userData = {
        email: this.email,
        password: this.password
      }
      this.valid = this.$refs.form.validate()
      if (!this.valid) return
      try {
        await this.$store.dispatch('auth/login', userData)
        const options = { icon: 'check_circle_outline' }
        if (this.loggedIn && this.token) {
          const page = redirectPage(this.token.user.role)
          await this.$router.replace(page)
          const firstName = this.token.user.name.split(' ')[0]
          this.$toasted.info(`Welcome ${firstName}`, options)
        }
      } catch (e) {
        throw e.message
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/layout/loginForm';
</style>
