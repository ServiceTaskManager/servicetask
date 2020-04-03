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
import { OpenStreetMapProvider } from 'leaflet-geosearch'

delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const provider = new OpenStreetMapProvider()

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
      return this.$store.getters['customers/filter']().filter(c => {
        if (c.address) return c.address.lat_lng !== undefined
        else return false
      })
    }
  },
  methods: {
    zoomToCustomer (customerId) {
      if (customerId) {
        let customer = this.$store.getters['customers/filter']([['id', '==', customerId]])
        if (customer.length === 1) {
          customer = customer[0]
          if (customer.address.lat_lng) {
            this.$refs.map.mapObject.setView([customer.address.lat_lng.lat, customer.address.lat_lng.lng], 12)
            this.customerToDisplay = customer
            this.drawer = true
          } else this.searchLatLng(customer)
        }
      } else {
        this.$refs.map.mapObject.setView({ 'lat': 33.32134852669881, 'lng': 5.888671875 }, 4)
      }
    },
    async searchLatLng (customer) {
      console.log('Search')
      if (customer) {
        const addressInline = Object.values(customer.address).filter(a => a).join(', ')
        console.log(addressInline)

        const latLng = await provider.search({ query: addressInline })
        if (latLng.length === 1) {
          customer.address.lat_lng = { lat: parseFloat(latLng[0].y), lng: parseFloat(latLng[0].x) }
          this.$store.dispatch('customers/patch', customer) // Update customer
          this.zoomToCustomer(customer.id) // Zoom to it
        } else if (latLng.length > 1) {
          const choice = latLng.map(l => {
            return {
              label: l.label,
              value: { lat: l.y, lng: l.x }
            }
          })
          console.log(choice)
          this.$q.dialog({
            title: 'Options',
            message: 'Choose an option:',
            options: {
              type: 'radio',
              model: 'opt1',
              // inline: true
              items: choice
            },
            cancel: true,
            persistent: true
          }).onOk(data => {
            customer.address.lat_lng = data
            this.$store.dispatch('customers/patch', customer)
            this.zoomToCustomer(customer.id)
          })
        } else {
          this.$q.notify({
            message: `Cannot find customer address`,
            color: 'negative'
          })
        }
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
