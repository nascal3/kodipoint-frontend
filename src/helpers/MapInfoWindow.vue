<template>
    <div class="info-window">
        <div class="info-window-title">Property location:</div>
        <div class="info-window-text">{{locationName}}</div>
    </div>
</template>

<script>
export default {
  name: 'MapInfoWindow',
  props: {
    locationName: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/mapInfoWindow';
</style>
