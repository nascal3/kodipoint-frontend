<template>
    <v-container class="login" pa-0 ma-0 fluid>
        <v-img class="login-bg" :src="require('@/assets/images/login_bg.jpg')"></v-img>
        <v-row no-gutters>
            <v-col cols="12">
                <v-row class="login-body" align="center" justify="center" no-gutters>
                    <v-card class="login-form-container">
                        <v-row no-gutters>
                            <v-col cols="5">
                                <v-row class="login-left-section" align="center" justify="center" no-gutters>
                                    <v-img class="login-logo" :src="require('@/assets/images/kodiPoint_logo.png')"></v-img>
                                </v-row>
                            </v-col>
                            <v-col cols="7">
                                <v-row class="login-right-section" align="center" justify="center" no-gutters>
                                    <div class="form-header">Sign in</div>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/pages/login';
</style>
