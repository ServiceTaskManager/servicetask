<template>
  <div>
    <q-drawer v-model="drawer" left overlay>
      <customer-list no-link>
        <template #item-left="{ customer }">
          <q-checkbox
            :value="customer.selected"
            @input="$store.dispatch('customers/toggleSelected', customer.id)" />
        </template>
        <template #item-right="{ customer }">
          <q-btn flat round
            :icon="customer.address.lat_lng ? 'navigation' : 'search'"
            @click.prevent="search(customer)"></q-btn>
        </template>
      </customer-list>
    </q-drawer>

    <l-map style="height: calc(100vh - 50px);"
      :zoom="map.zoom"
      :center="map.center"
      ref="map">

      <l-tile-layer :url="map.url" />

      <l-control position="bottomleft">
        <q-btn round icon="settings" color="black" @click="drawer = !drawer" />
      </l-control>

      <l-marker v-for="customer in customers"
        :key="customer.id"
        :lat-lng="customer.address.lat_lng">
        <l-icon :icon-anchor="[10, 10]">
          <q-avatar :icon="$customers.meta.icon" :color="$customers.meta.color" style="color: white;" size="20px"  />
        </l-icon>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LIcon, LTileLayer, LControl, LMarker } from 'vue2-leaflet'
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
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        zoom: 5,
        center: [47.41322, -1.219482]
      },
      drawer: false
    }
  },
  computed: {
    customers () {
      const customers = this.$store.getters['customers/filter']([['selected', '==', true]])
      console.log(customers)
      return customers.filter(c => c.address.lat_lng !== undefined)
    }
  },
  methods: {
    async search (customer) {
      if (customer.address.lat_lng === undefined) {
        const addressInline = `${customer.name}, 
          ${customer.address.addr1}, 
          ${customer.address.postal_code}, 
          ${customer.address.city}, 
          ${customer.address.country}`
        const latLng = await provider.search({ query: addressInline })
        if (latLng.length === 1) {
          customer.address.lat_lng = { lat: parseFloat(latLng[0].y), lng: parseFloat(latLng[0].x) }
          this.$store.dispatch('customers/patch', customer)
        } else {
          this.$q.notify({
            message: `Cannot find customer address`,
            color: 'negative'
          })
        }
      } else {
        this.$refs.map.mapObject.setView([customer.address.lat_lng.lat, customer.address.lat_lng.lng], 12)
        if (!customer.selected) this.$store.dispatch('customers/toggleSelected', customer.id)
      }
    }
  },
  components: {
    LMap,
    LTileLayer,
    LControl,
    LMarker,
    LIcon,
    CustomerList: () => import('../components/customer/CustomerList')
  }
}
</script>

<style>
@import "~leaflet/dist/leaflet.css";
</style>
