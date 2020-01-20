<template>
    <v-container class="login" pa-0 ma-0 fluid>
        <v-img class="login-bg" :src="require('@/assets/images/login_bg.jpg')"></v-img>
        <v-row no-gutters>
            <v-col cols="12" md="8">
            </v-col>
            <v-col class="login-form-container" cols="12" md="4">
                <section class="form-section">
                   <div class="form-section-logo d-flex justify-center align-center">
                       <v-img class="login-logo" :src="require('@/assets/images/kodiPoint_logo.png')"></v-img>
                   </div>

                    <div class="form-container d-flex flex-column justify-center align-center">
                      <div class="form-container-header">
                        {{tab ? 'Register' : 'Sign in'}}
                      </div>
                      <div class="form-container-subheader">
                        {{tab ? 'Register for an account' : 'Login into your account'}}
                      </div>

                      <v-tabs class="form-container-tabs" v-model="tab">
                        <v-tabs-slider></v-tabs-slider>
                        <v-tab>Login</v-tab>
                        <v-tab>Register</v-tab>
                      </v-tabs>

                      <v-tabs-items v-model="tab">
                        <v-tab-item class="tab-container">
                          <login-form></login-form>
                        </v-tab-item>
                        <v-tab-item>
                          register form here
                        </v-tab-item>
                      </v-tabs-items>

                    </div>
                </section>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import LoginForm from '@/components/authForms/LoginForm'

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  data: () => ({
    tab: null
  })
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/pages/login';
</style>
