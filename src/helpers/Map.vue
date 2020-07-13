<template>
    <GmapMap
        ref="mapRef"
        :center="center"
        :zoom="zoom"
        :options="options"
        @click="clicked"
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
    },
    editLocation: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  components: {
    MapInfoWindow
  },
  data: () => ({
    center: mapCoordinates.nairobi,
    zoom: 15,
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
    noCoordinates: { lat: 0, lng: 0 },
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
  watch: {
    async propertyCoordinates (newCoordinates) {
      this.center = newCoordinates || this.noCoordinates
      await this.mapInit()
    }
  },
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
      geoCoder.geocode({ 'location': coordinates }, (results, status) => {
        const locationData = { 'name': '', 'coordinates': this.noCoordinates }
        if (status === 'OK') {
          scope.error = false
          if (results[0]) {
            scope.locationName = results[0].formatted_address

            locationData.name = scope.locationName
            locationData.coordinates = coordinates
            scope.$emit('locationName', locationData)
          } else {
            window.alert('No results found :(')
          }
        } else {
          scope.$emit('locationName', locationData)
          scope.error = true
          const options = { icon: 'error_outline' }
          this.$toasted.warning(`Please set property location on the map!`, options)
          window.alert(`Please set property location on the map!`)
          console.error(`Geocoder failed due to: ${status}!`)
        }
      })
    },
    async mapInit () {
      this.propertyLocation = this.propertyCoordinates || this.center
      if (this.editLocation) this.propertyLocation = this.propertyCoordinates || this.noCoordinates
      const map = await this.$refs.mapRef.$mapPromise
      map.panTo(this.propertyLocation)
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
