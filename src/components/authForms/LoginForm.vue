<template>
  <section>
    <transition name="fade">
      <div class="login-error" v-if="authError">Please confirm that your email or password is correct!</div>
    </transition>
    <v-form ref="form" v-model="valid" @submit.prevent="onLogin">
      <v-text-field
        v-model="email"
        v-validate="'required|email'"
        name="email"
        label="Email"
        :error="errors.has('email')"
      ></v-text-field>
      <transition name="fade">
        <span class="input-error" v-if="errors.has('email')">{{ errors.first('email') }}</span>
      </transition>

      <v-text-field
        type="password"
        v-model="password"
        v-validate="'required'"
        name="password"
        label="Password"
        :error="errors.has('password')"
      ></v-text-field>
      <transition name="fade">
        <span class="input-error" v-if="errors.has('password')">{{ errors.first('password') }}</span>
      </transition>

      <div class="reset-password" @click="overlay = !overlay">
        <span>Forgot password?</span>
      </div>

      <v-overlay light :value="overlay">
        <v-card light class="mx-auto" elevation="12" opacity="0.53">
          <v-card-title>Forgot Password ?</v-card-title>
          <v-card-text>
            Please call <span>0800 300 200</span> or <br>
            email <span>business@safeboda.com</span> for assistance
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
        Login
      </v-btn>
    </v-form>
  </section>
</template>

<script>
import { redirectPage } from '@/services/authGuards'
import { mapGetters } from 'vuex'

export default {
  name: 'LoginForm',
  data: () => ({
    valid: false,
    email: '',
    password: '',
    overlay: false
  }),
  computed: {
    ...mapGetters('auth', {
      authError: 'authError',
      token: 'token',
      showLoader: 'showLoader',
      loggedIn: 'loggedIn'
    })
  },
  methods: {
    async onLogin () {
      const userData = {
        username: this.email,
        password: this.password
      }
      try {
        await this.$validator.validateAll()
        await this.$store.dispatch('auth/login', userData)
        const options = { icon: 'check_circle_outline' }
        if (this.loggedIn && this.token) {
          const page = redirectPage(this.token.user.role)
          await this.$router.replace(page)
          const firstName = this.token.user.name.split(' ')[0]
          this.$toasted.show(`Welcome ${firstName}`, options)
        }
      } catch (e) {
        console.error(e.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/layout/loginForm';
</style>
