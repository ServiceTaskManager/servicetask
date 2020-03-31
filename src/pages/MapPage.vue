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

    <maps ref="map" class="full-width" style="height: calc(100vh - 50px)" />

  </q-layout>
</template>

<script>
import { OpenStreetMapProvider } from 'leaflet-geosearch'

const provider = new OpenStreetMapProvider()

export default {
  name: 'MapsPage',
  data () {
    return {
      drawer: false,
      customerToDisplay: undefined
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
    zoomToCustomer (customerId) {
      if (this.customers.filter(c => c.id === customerId).length === 0) this.search(customerId)
      else this.$refs.map.zoomToCustomer(customerId)
    }
  },
  components: {
    CustomerAddress: () => import('../components/generic/Address'),
    Maps: () => import('../components/generic/Map')
  }
}
</script>
