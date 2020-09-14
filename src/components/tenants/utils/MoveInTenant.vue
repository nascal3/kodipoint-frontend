<template>
    <section class="tenant-banner-section d-flex align-center justify-end">
        <v-btn
            class="btn-text"
            color="primary"
            @click="openDialog"
        >
            <v-icon left>mdi-exit-run</v-icon>
            Move In Tenant
        </v-btn>
    </section>
</template>

<script>
export default {
  name: 'MoveInTenant',
  methods: {
    openDialog () {
      const payload = { 'open': true, 'edit': false }
      this.$store.commit('tenants/SHOW_MOVE_TENANT_DIALOG', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/manageTenant';
</style>
