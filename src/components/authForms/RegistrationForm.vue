<template>
    <section>
        <v-form ref="form" v-model="valid" @submit.prevent="onRegister">
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

            <v-btn
                type="submit"
                :loading="showLoader"
                :disabled="showLoader"
                class="login-btn"
                depressed
                block
                color="secondary"
            >
                Register
            </v-btn>
        </v-form>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RegistrationForm',
  data: () => ({
    valid: false,
    email: '',
    password: ''
  }),
  computed: {
    ...mapGetters('auth', {
      showLoader: 'showLoader'
    })
  },
  methods: {
    onRegister () {

    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/registrationForm';
</style>
