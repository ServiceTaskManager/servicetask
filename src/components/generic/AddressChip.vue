<template>
  <q-chip v-bind="$attrs" v-on="$listeners"
    clickable
    @click="startNavigation"
    style="overflow: hidden;">
    <q-avatar color="blue" icon="map" />
    {{ displayAddress }}
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
    },
    show: {
      type: Array,
      default: () => {
        return ['addr1', 'addr2', 'postal_code', 'city', 'country']
      }
    }
  },
  computed: {
    displayAddress () {
      let show = this.show
      return this.addressInline(show)
    },
    addressInline: c => show => {
      let customerAddress = ''
      show.forEach(e => {
        let suffix = show.indexOf(e) === show.length - 1 ? '' : ', '
        if (c.address[e] !== undefined && typeof e === 'string') customerAddress += c.address[e] + suffix
      })
      return customerAddress
    },
    navigationURL () {
      let baseURL = 'https://www.google.com/maps/dir/?api=1&destination='
      let addressInline = this.addressInline(['addr1', 'addr2', 'postal_code', 'city', 'country'])
      return baseURL + encodeURI(addressInline)
    }
  },
  methods: {
    startNavigation () {
      openURL(this.navigationURL)
    }
  }
}
</script>
