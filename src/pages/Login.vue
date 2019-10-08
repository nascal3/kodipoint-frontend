<template>
    <v-container class="login" pa-0 ma-0 fluid>
        <v-img class="login-bg" :src="require('@/assets/images/login_bg.jpg')"></v-img>
        <v-row no-gutters>
            <v-col cols="12">
                <v-row class="login-body" align="center" justify="center" no-gutters>
                    <v-card class="login-form-container">
                        stuff
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
