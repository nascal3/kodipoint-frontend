<template>
  <v-card class="pa-2">
    <v-card-title class="card-title">Add Property</v-card-title>
    <v-card-subtitle class="card-subtitle">Add new properties</v-card-subtitle>
    <v-card-text>
      <v-form v-model="valid" @submit.prevent="addProperty">
        <v-text-field
          v-model="propertyName"
          label="Property name"
          v-validate="'required'"
          name="propertyName"
          :error="errors.has('propertyName')"
        ></v-text-field>
        <transition name="fade">
          <span class="input-error" v-if="errors.has('propertyName')">
            Please enter property name!
          </span>
        </transition>
        <v-select
            v-model="propertyType"
            :items="properties"
            label="Property Type"
            class="propertySelector"
        ></v-select>
        <div class="contact-title">Contact person</div>
        <v-radio-group v-model="contact" row>
          <v-radio label="Landlord" color="primary" value="landlord"></v-radio>
          <v-radio label="Other" color="primary" value="other"></v-radio>
        </v-radio-group>
        <transition name="fade">
          <section v-if="contact === 'other'">
          <v-text-field
              v-model="contactPerson"
              label="Contacts' name"
              v-validate="'required'"
              name="propertyName"
              :error="errors.has('contactPerson')"
          ></v-text-field>
          <transition name="fade">
            <span class="input-error" v-if="errors.has('contactPerson')">
            Please insert contacts' name!
          </span>
          </transition>
          <v-text-field
              v-model="contactPhone"
              label="Contacts' phone number"
              v-validate="'required|min:17 '"
              name="contactPhone"
              persistent-hint
              :error="errors.has('contactPhone')"
              data-vv-as="contacts' phone number"
              v-mask="['+(###) ####-#####']"
          ></v-text-field>
          <transition name="fade">
            <div class="input-error" v-if="errors.has('contactPhone')">
              {{ errors.first('contactPhone') }}
            </div>
          </transition>
          <transition name="fade">
            <span class="input-hint" v-if="!contactPhone.length">
              Phone number format: 254 7123456789
            </span>
          </transition>
        </section>
        </transition>
        <v-text-field
            v-model="lrNumber"
            label="LR number"
            v-validate="'required'"
            name="lrNumber"
            :error="errors.has('lrNumber')"
        ></v-text-field>
        <transition name="fade">
          <span class="input-error" v-if="errors.has('lrNumber')">
            Please enter LR Number!
          </span>
        </transition>
        <v-text-field
            v-model="nosUnits"
            label="Number of units"
            v-validate="'required'"
            name="nosUnits"
            :error="errors.has('nosUnits')"
        ></v-text-field>
        <transition name="fade">
          <span class="input-error" v-if="errors.has('nosUnits')">
            Please enter number of units!
          </span>
        </transition>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AddProperty',
  data: () => ({
    valid: false,
    propertyName: '',
    contact: 'landlord',
    contactPerson: '',
    contactPhone: '',
    lrNumber: '',
    nosUnits: '',
    propertyType: 'Apartments',
    properties: [
      'Apartments',
      'Business premises',
      'Apartments & Business premises',
      'Warehouse'
    ]
  }),
  methods: {
    addProperty () {
      alert('ola')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/styles/layout/addProperty';
</style>
