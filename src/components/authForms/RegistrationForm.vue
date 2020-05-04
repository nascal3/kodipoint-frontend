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
                v-mask="['(+###) ####-#####']"
            ></v-text-field>
            <transition name="fade">
                <div class="input-error" v-if="errors.has('phone')">
                    {{
                    errors.items[0].rule === 'min'
                        ? 'Please insert complete phone number! e.g (+254) 7234-56789'
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
                type="password"
                v-model="password"
                v-validate="'required'"
                name="password"
                label="Password*"
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
    name: '',
    phone: '',
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
    async onRegister () {
      const userData = {
        name: this.name,
        phone: this.phone,
        username: this.email,
        password: this.password,
        role: this.role
      }
      try {
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
