export default {
  methods: {
    thousandSeparator (value) {
      if (!value && (value !== 0)) return
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    formatPriceToNumber (value) {
      if (value) {
        // eslint-disable-next-line no-useless-escape
        value = value.replace(/\,/g, '')
        return parseFloat(value)
      }
    }
  }
}
