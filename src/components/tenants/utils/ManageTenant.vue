<template>
    <section class="tenant-banner-section d-flex align-center justify-end">
        <v-btn
            class="btn-text"
            color="primary"
            @click="openDialog"
        >
            Manage Tenant
        </v-btn>
    </section>
</template>

<script>
export default {
  name: 'ManageTenant',
  methods: {
    openDialog () {
      this.$store.commit('tenants/SHOW_MANAGEMENT_TENANT_DIALOG', true)
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/manageTenant';
</style>
