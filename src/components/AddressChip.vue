<template>
  <q-chip v-bind="$attrs" v-on="$listeners"
    clickable
    @click="startNavigation"
    class="full-width">
    <q-avatar color="blue" icon="map" />
    {{ customerAddressInline }}
  </q-chip>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'AddressChip',
  props: {
    address: {
      type: Object,
      default: () => {
        return {
          addr1: '',
          addr2: '',
          postal_code: '',
          city: '',
          country: ''
        }
      }
    }
  },
  computed: {
    customerAddressInline () {
      return `${this.address.addr1}, ${this.address.addr2 || ''}, ${this.address.postal_code} ${this.address.city}, ${this.address.country}`
    },
    navigationURL () {
      let baseURL = 'https://www.google.com/maps/dir/?api=1&destination='
      return baseURL + encodeURI(this.customerAddressInline)
    }
  },
  methods: {
    startNavigation () {
      openURL(this.navigationURL)
    }
  }
}
</script>
