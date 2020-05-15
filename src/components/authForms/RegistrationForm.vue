<template>
    <section>
        <v-form ref="form" v-model="valid" @submit.prevent="onRegister">

            <v-text-field
                v-model="name"
                v-validate="'required'"
                name="name"
                label="Full name*"
                :error="errors.has('name')"
            ></v-text-field>
            <transition name="fade">
                <span class="input-error" v-if="errors.has('name')">{{ errors.first('name') }}</span>
            </transition>

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

            <v-text-field
                v-model="email"
                v-validate="'required|email'"
                name="email"
                label="Email*"
                :error="errors.has('email')"
            ></v-text-field>
            <transition name="fade">
                <span class="input-error" v-if="errors.has('email')">{{ errors.first('email') }}</span>
            </transition>
            <transition name="fade">
                <div class="input-error" v-if="authEmailDuplicationError">
                    The following email is already registered!
                </div>
            </transition>

            <v-text-field
                    :type="show1 ? 'text' : 'password'"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    v-model="password"
                    v-validate="'required'"
                    name="password"
                    label="Password*"
                    @input="checkPasswordMatch"
                    :error="errors.has('password')"
                    @click:append="show1 = !show1"
            ></v-text-field>
            <transition name="fade">
                <span class="input-error" v-if="errors.has('password')">{{ errors.first('password') }}</span>
            </transition>

            <v-text-field
                :type="show2 ? 'text' : 'password'"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                v-model="repeatPassword"
                v-validate="'required'"
                name="repeatPassword"
                data-vv-as="re typed password"
                label="Re-type Password*"
                @input="checkPasswordMatch"
                :error="errors.has('repeatPassword')"
                @click:append="show2 = !show2"
            ></v-text-field>
            <transition name="fade">
                <div class="input-error" v-if="errors.has('repeatPassword')">{{ errors.first('repeatPassword') }}</div>
            </transition>
            <transition name="fade">
                <div class="input-error" v-if="passwordMatch">Password you entered doesn't match</div>
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
                </template>
            </v-checkbox>

            <v-btn
                type="submit"
                :loading="showLoader"
                :disabled="showLoader || !agree"
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
    agree: false
  }),
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
    async onRegister () {
      const userData = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        password: this.password,
        role: this.role
      }
      try {
        if (this.passwordMatch) return
        this.valid = await this.$validator.validateAll()
        if (!this.valid) return
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
