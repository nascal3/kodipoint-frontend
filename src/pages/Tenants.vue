<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="2">
        <tenant-list class="landlord-list" @openAddDialog="openDialog" :reloadValue="changed" />
      </v-col>
      <v-col cols="12" sm="10" v-if="showSection">
<!--        <landlord-details class="landlord-table-card" @openEditDialog="openDialog" />-->
<!--        <property-table :landlordSelected="landlordSelected"></property-table>-->
      </v-col>
    </v-row>
<!--    <v-overlay light :value="dialog">-->
<!--      <landlord-form @closeModal="closeModal" :edit="edit" :landlordInfo="landlordInfo" />-->
<!--    </v-overlay>-->
  </v-container>
</template>

<script>
import TenantList from '@/components/tenants/TenantList'

export default {
  name: 'Tenants',
  components: {
    TenantList
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/pages/tenants';
</style>
