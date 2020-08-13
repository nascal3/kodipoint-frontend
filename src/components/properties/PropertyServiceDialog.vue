<template>
    <v-card>
        <v-card-title class="headline">{{serviceInfo.service_name}} service</v-card-title>
        <v-form ref="form" v-model="valid" @submit.prevent="editServicePrice">
            <v-card-text>
                <v-text-field
                    v-model="servicePrice"
                    label="Set service price*"
                    :rules="[rules.priceRequired]"
                    name="servicePrice"
                ></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    class="btn-text"
                    outlined
                    small
                    color="default"
                    @click="closeDialog"
                >
                    Close
                </v-btn>
                <v-btn
                    type="submit"
                    :loading="showLoader"
                    :disabled="showLoader"
                    color="primary"
                    small
                    class="btn-text"
                    @click="dialog = false"
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
import thousandSeparator from '@/mixins/thousandSeparator'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PropertyServiceDialog',
  mixins: [thousandSeparator],
  props: {
    serviceInfo: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    valid: true,
    servicePrice: '',
    rules: {
      priceRequired: value => !!value || 'Service price required'
    }
  }),
  watch: {
    serviceInfo (newValue) {
      this.servicePrice = newValue.service_price
    },
    async servicePrice (newValue) {
      newValue = newValue.toString()
      const result = newValue.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      await this.$nextTick(() => {
        this.servicePrice = result
      })
    }
  },
  computed: {
    ...mapGetters({
      showLoader: ['property/showLoader']
    })
  },
  methods: {
    ...mapActions('property', {
      editPropertyServicePrice: 'editPropertyServicePrice'
    }),
    closeDialog () {
      const payload = {
        'status': false,
        'propertyInfo': {}
      }
      this.$emit('showServiceDialog', payload)
    },
    async editServicePrice () {
      this.valid = this.$refs.form.validate()
      if (!this.valid) return
      try {
        const payload = {
          'id': this.serviceInfo.id,
          'property_id': this.serviceInfo.property_id,
          'price': this.formatPriceToNumber(this.servicePrice)
        }
        const newPropertyValues = await this.editPropertyServicePrice(payload)
        if (newPropertyValues) {
          const payload = {
            'status': false,
            'propertyInfo': newPropertyValues
          }
          this.$emit('showServiceDialog', payload)
        }
      } catch (err) {
        throw err
      }
    }
  },
  created () {
    this.servicePrice = this.serviceInfo.service_price
  }
}
</script>

<style lang="scss" scoped>

</style>
