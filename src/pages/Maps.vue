<template>
  <div>
    <l-map style="width: 100%; height: 100%; min-height: calc(100vh - 100px);"
      :zoom="map.zoom"
      :center="map.center">

      <l-tile-layer :url="map.url" />

      <l-control position="bottomleft">
        <q-btn round icon="settings" color="black" @click="paramsDialog = true" />
      </l-control>

      <l-marker v-for="customer in customers"
        :key="customer.id"
        :lat-lng="customer.address.lat_lng">
        <l-popup>
          <q-card>
            <q-card-section>
              {{ customer.name }}
            </q-card-section>
          </q-card>
        </l-popup>
        <l-icon :icon-anchor="[10, 10]">
          <q-avatar :icon="$customers.meta.icon" :color="$customers.meta.color" style="color: white;" size="20px"  />
        </l-icon>
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
import { LMap, LIcon, LTileLayer, LControl, LMarker, LPopup } from 'vue2-leaflet'
import { Icon } from 'leaflet'

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
    this.customers = customers.filter(c => c.address.lat_lng !== undefined)
  },
  components: {
    LMap,
    LTileLayer,
    LControl,
    LMarker,
    LPopup,
    LIcon
  }
}
</script>

<style>
@import "~leaflet/dist/leaflet.css";
</style>
