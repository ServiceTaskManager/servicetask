<template>
  <div>
    <l-map style="width: 100%; height: 100%; min-height: calc(100vh - 100px);"
      :zoom="map.zoom"
      :center="map.center">

      <l-tile-layer :url="map.url" />

      <l-control position="bottomleft">
        <q-btn round icon="settings" color="black" @click="paramsDialog = true" />
      </l-control>

      <l-marker :lat-lng="customers">
        <l-popup>customer.name</l-popup>
      </l-marker>
    </l-map>

    <q-dialog v-model="paramsDialog">
      <q-card>
        {{ map }}
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { LMap, LTileLayer, LControl, LMarker, LPopup } from 'vue2-leaflet'
import { GoogleProvider } from 'leaflet-geosearch'
import { Icon } from 'leaflet'

const provider = new GoogleProvider()

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
      paramsDialog: false,
      customers: []
    }
  },
  mounted () {
    let customers = this.$store.getters['customers/filter']()
    let newCustomers = []
    customers.forEach(c => {
      let customer = JSON.parse(JSON.stringify(c))
      let address = {
        addr1: c.addr1,
        addr2: c.addr2,
        postal_code: c.postal_code,
        city: c.city,
        country: c.country }
      let addressInline = Object.values(address).filter(a => a !== undefined).join(', ')
      provider.search({ query: addressInline }).then(r => {
        if (r.length !== 1) console.log(addressInline, r)
        let result = r
        address.lat_lng = [result.y, result.y]
      })
      customer.address = address
      delete customer.addr1
      delete customer.addr2
      delete customer.postal_code
      delete customer.city
      delete customer.country
      newCustomers.push(customer)
    })
    console.log(newCustomers)
  },
  components: {
    LMap,
    LTileLayer,
    LControl,
    LMarker,
    LPopup
  }
}
</script>

<style>
@import "~leaflet/dist/leaflet.css";
</style>
