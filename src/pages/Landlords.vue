<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="2">
        <landlord-list class="landlord-list" :reloadValue="changed"></landlord-list>
      </v-col>
      <v-col cols="12" sm="10" v-if="showSection">
        <landlord-details class="landlord-table-card" @openEditDialog="openDialog"></landlord-details>
        <property-table :landlordSelected="landlordSelected"></property-table>
      </v-col>
    </v-row>
    <v-overlay light :value="dialog">
      <landlord-form @closeModal="closeModal" :edit="edit" :landlordInfo="landlordInfo"></landlord-form>
    </v-overlay>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PropertyTable from '@/components/properties/PropertyTable'
import LandlordDetails from '@/components/landlords/LandlordsDetails'
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
    LandlordDetails,
    PropertyTable,
    LandlordList,
    LandlordForm
  },
  computed: {
    ...mapGetters('landlord', {
      landlordSelected: 'selectedLandlord'
    }),
    showSection () {
      return Object.keys(this.landlordSelected).length
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
      Object.keys(landlord).length ? this.edit = true : this.edit = false
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
  @import 'src/styles/pages/landlords';
</style>
