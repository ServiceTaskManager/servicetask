<template>
  <l-map
    v-bind="$attrs"
    :zoom="map.zoom"
    :center="map.center"
    @update:zoom="map.zoom = $event"
    @update:center="map.center = $event"
    ref="map">

    <l-tile-layer :url="map.url" />

    <l-marker v-for="customer in customers"
      :key="customer.id"
      :lat-lng="customer.address.lat_lng"
      @click="zoomToCustomer(customer.id)">
      <l-icon :icon-anchor="[10, 10]">
        <q-btn
          round
          :icon="$models.customer.meta.icon"
          :color="$models.customer.meta.color"
          style="color: white;"
          size="5px" />
      </l-icon>
    </l-marker>
  </l-map>
</template>

<script>
import { LMap, LIcon, LTileLayer, LMarker } from 'vue2-leaflet'
import { Icon } from 'leaflet'

delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'MapComponent',
  data () {
    return {
      map: {
        url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
        zoom: 4,
        center: { 'lat': 33.32134852669881, 'lng': 5.888671875 }
      }
    }
  },
  computed: {
    customers () {
      return this.$store.getters['customers/filter']().filter(c => c.address.lat_lng)
    }
  },
  methods: {
    zoomToCustomer (customerId) {
      console.log('zoomin')
      if (customerId) {
        const customer = this.$store.getters['customers/filter']([['id', '==', customerId]]).filter(c => c.address.lat_lng)[0]
        if (customer) {
          this.$refs.map.mapObject.setView([customer.address.lat_lng.lat, customer.address.lat_lng.lng], 12)
          this.customerToDisplay = customer
          this.drawer = true
        }
      } else {
        this.$refs.map.mapObject.setView({ 'lat': 33.32134852669881, 'lng': 5.888671875 }, 4)
      }
    }
  },
  mounted () {
    this.$emit('mounted', this)
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon
  }
}
</script>

<style>
@import "~leaflet/dist/leaflet.css";
</style>
