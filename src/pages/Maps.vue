<template>
  <q-layout container view="hHh lpR fFf" style="height: calc(100vh - 50px)">
    <q-drawer v-model="drawer" behavior="mobile" :overlay="false" side="left">
      <div v-if="customerToDisplay" class="q-pa-sm">
        <span class="text-h5">{{ customerToDisplay.name }}</span>
        <customer-address :address="customerToDisplay.address" class="text-caption" />
        <q-chip icon="email" class="full-width" dense>
          <q-btn type="a" :href="'mail:' + customerToDisplay.email" :label="customerToDisplay.email" flat dense class="q-pa-none" />
        </q-chip>
        <q-chip icon="phone" class="full-width" dense>
          <q-btn type="a" :href="'tel:' + customerToDisplay.phone" :label="customerToDisplay.phone" flat dense class="q-pa-none" />
        </q-chip>
      </div>
    </q-drawer>

    <l-map
      style="height: calc(100vh - 50px)"
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
  </q-layout>
</template>

<script>
import { LMap, LIcon, LTileLayer, LMarker } from 'vue2-leaflet'
import { Icon } from 'leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'

const provider = new OpenStreetMapProvider()

delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'Maps',
  data () {
    return {
      map: {
        url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
        zoom: 4,
        center: { 'lat': 33.32134852669881, 'lng': 5.888671875 }
      },
      drawer: false,
      customerToDisplay: undefined
    }
  },
  computed: {
    customers () {
      return this.$store.getters['customers/filter']().filter(c => c.address.lat_lng)
    }
  },
  methods: {
    async search (customerId) {
      const customer = this.$store.getters['customers/filter']([['id', '==', customerId]])[0]
      if (customer) {
        const addressInline = Object.values(customer.address).filter(a => a).join(', ')
        console.log(addressInline)

        const latLng = await provider.search({ query: addressInline })
        if (latLng.length === 1) {
          customer.address.lat_lng = { lat: parseFloat(latLng[0].y), lng: parseFloat(latLng[0].x) }
          this.$store.dispatch('customers/patch', customer) // Update customer
          this.zoomToCustomer(customer.id) // Zoom to it
        } else if (latLng.length > 1) {
          this.$q.dialog({
            title: 'Select one',
            text: latLng
          })
        } else {
          this.$q.notify({
            message: `Cannot find customer address`,
            color: 'negative'
          })
        }
      }
    },
    async zoomToCustomer (customerId) {
      if (customerId) {
        const customer = this.customers.filter(c => c.id === customerId)[0]
        if (customer) {
          this.$refs.map.mapObject.setView([customer.address.lat_lng.lat, customer.address.lat_lng.lng - 0.05], 12)
          this.customerToDisplay = customer
          this.drawer = true
        } else this.search(customerId)
      } else {
        this.$refs.map.mapObject.setView({ 'lat': 33.32134852669881, 'lng': 5.888671875 }, 4)
      }
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    CustomerAddress: () => import('../components/generic/Address')
  }
}
</script>

<style>
@import "~leaflet/dist/leaflet.css";
</style>
