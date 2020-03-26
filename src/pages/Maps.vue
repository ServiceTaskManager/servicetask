<template>
  <q-layout container view="hHh lpR fFf" style="height: calc(100vh - 50px)">
    <q-drawer v-model="drawer" side="left">
        <store-list store="customers" no-link>
          <template #item-right="{ data }">
            <q-btn flat round
              :icon="data.address.lat_lng ? 'navigation' : 'search'"
              @click.prevent="search(data)" />
          </template>
        </store-list>

        {{ map }}

        <q-btn round
          icon="keyboard_arrow_left" color="black"
          class="absolute"
          style="bottom: 10px; right: -20px;"
          @click="drawer = !drawer" />
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
        :lat-lng="customer.address.lat_lng">
        <l-icon :icon-anchor="[10, 10]">
          <q-avatar
            :icon="$customers.meta.icon"
            :color="$customers.meta.color"
            style="color: white;" size="20px">
          </q-avatar>
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
        center: [37.822802, -12.700195]
      },
      drawer: true
    }
  },
  computed: {
    customers () {
      const customers = this.$store.getters['customers/filter']([['selected', '==', true]])

      return customers.filter(c => c.address.lat_lng !== undefined)
    }
  },
  methods: {
    async search (customer) {
      if (customer.address.lat_lng === undefined) {
        const addressInline = customer.address.addr1 + ', ' +
          customer.address.postal_code + ', ' +
          customer.address.city + ', ' +
          customer.address.country

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
        this.$refs.map.mapObject.setView([customer.address.lat_lng.lat, customer.address.lat_lng.lng - 0.05], 12)
        if (!customer.selected) this.$store.dispatch('customers/toggleSelected', customer.id)
      }
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    StoreList: () => import('../components/generic/StoreList')
  }
}
</script>

<style>
@import "~leaflet/dist/leaflet.css";
</style>
