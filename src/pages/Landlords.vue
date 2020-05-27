<template>
  <v-container fluid>
    <v-row class="content">
      <v-col class="list-area" cols="12" sm="2">
        <landlord-list @openAddDialog="openDialog" :reloadValue="changed" />
      </v-col>
      <v-col class="info-area" cols="12" sm="10" v-if="showSection">
        <user-details-banner class="table-card" @openEditDialog="openDialog" />
        <property-table :landlordSelected="landlordSelected" />
      </v-col>
    </v-row>
    <v-overlay light :value="dialog">
      <landlord-form @closeModal="closeModal" :edit="edit" :landlordInfo="landlordInfo" />
    </v-overlay>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PropertyTable from '@/components/properties/PropertyTable'
import UserDetailsBanner from '@/components/utils/UserDetailsBanner'
import LandlordList from '@/components/landlords/LandlordList'
import LandlordForm from '@/components/landlords/LandlordForm'

export default {
  name: 'Landlords',
  data: () => ({
    changed: null,
    dialog: false,
    edit: false,
    landlordInfo: {}
  }),
  components: {
    PropertyTable,
    LandlordList,
    LandlordForm,
    UserDetailsBanner
  },
  computed: {
    ...mapGetters('landlord', {
      landlordSelected: 'selectedLandlord'
    }),
    showSection () {
      return Object.keys(this.landlordSelected).length > 0
    }
  },
  watch: {
    landlordSelected (newValues) {
      this.landlordInfo = newValues
    }
  },
  methods: {
    ...mapActions('landlord', {
      resetSelectedLandlord: 'resetSelectedLandlord'
    }),
    openDialog (landlord) {
      this.edit = !!Object.keys(landlord).length
      this.dialog = true
    },
    closeModal (value) {
      this.dialog = value.openState
      if (value.formSubmitted) {
        this.resetSelectedLandlord()
        this.changed = +new Date()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/components/defaultInfoPage';
</style>
