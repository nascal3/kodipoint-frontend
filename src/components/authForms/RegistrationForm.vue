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
            <transition name="fade">
                <div class="input-error" v-if="authEmailError">The following email is already registered!</div>
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

            <v-radio-group v-model="role" row>
                <v-radio label="Landlord" value="landlord"></v-radio>
                <v-radio label="Tenant" value="tenant"></v-radio>
                <v-radio label="Both" value="landlord/tenant"></v-radio>
            </v-radio-group>

            <v-checkbox v-model="agree">
                <template v-slot:label>
                    <div class="terms">
                        I agree to
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <a
                                    target="_blank"
                                    href="#"
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
                </template>
            </v-checkbox>

            <v-btn
                type="submit"
                :loading="showLoader"
                :disabled="showLoader || !agree"
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
    password: '',
    role: 'landlord',
    agree: false
  }),
  computed: {
    ...mapGetters('auth', {
      authEmailError: 'authEmailError',
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
