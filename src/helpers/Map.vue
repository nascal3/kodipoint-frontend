<template>
    <GmapMap
        ref="mapRef"
        :center="center"
        :zoom="13"
        :options="options"
        @click="clicked"
        style="width: 100%; height: 100%"
        v-if="!error"
    >
        <GmapMarker
            :position="propertyLocation"
            :clickable="true"
            @click="toggleInfoWindow(propertyLocation)"
        />
        <gmap-info-window
            :options="infoOptions"
            :position="infoWindowPos"
            :opened="infoWinOpen"
            @closeclick="infoWinOpen=false"
        >
            <map-info-window :location-name="locationName" />
        </gmap-info-window>
    </GmapMap>
</template>

<script>
import { mapCoordinates } from '@/config'
import MapInfoWindow from '@/helpers/MapInfoWindow'

export default {
  name: 'Map',
  props: {
    propertyCoordinates: {
      type: Object,
      required: false
    }
  },
  components: {
    MapInfoWindow
  },
  data: () => ({
    center: mapCoordinates.nairobi,
    propertyLocation: null,
    locationName: '',
    infoContent: '',
    infoWindowPos: { lat: 0, lng: 0 },
    infoWinOpen: false,
    infoOptions: {
      pixelOffset: {
        width: 0,
        height: -35
      }
    },
    error: false,
    options: {
      'zoomControl': true,
      'mapTypeControl': true,
      'scaleControl': false,
      'streetViewControl': false,
      'rotateControl': false,
      'fullscreenControl': false,
      'disableDefaultUi': true
    }
  }),
  methods: {
    clicked (event) {
      this.infoWinOpen = false
      this.propertyLocation = {
        'lat': event.latLng.lat(),
        'lng': event.latLng.lng()
      }
      this.getLocationName(this.propertyLocation)
    },
    toggleInfoWindow (marker) {
      this.center = marker
      this.infoWindowPos = marker
      this.infoContent = marker
      this.infoWinOpen = !this.infoWinOpen
    },
    getLocationName (coordinates) {
      const geoCoder = new google.maps.Geocoder()
      const scope = this
      geoCoder.geocode({ 'location': coordinates }, function (results, status) {
        if (status === 'OK') {
          if (results[0]) {
            scope.locationName = results[0].formatted_address
            scope.$emit('locationName', scope.locationName)
          } else {
            window.alert('No results found :(')
          }
        } else {
          scope.error = true
          window.alert(`Oops...Geocoder failed due to: ${status}!\n Reload the page and try again.`)
        }
      })
    },
    async mapInit () {
      const map = await this.$refs.mapRef.$mapPromise
      map.panTo(this.center)
      this.propertyLocation = this.propertyCoordinates || this.center
      this.getLocationName(this.propertyLocation)
    }
  },
  async mounted () {
    await this.mapInit()
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/layout/map';
</style>
