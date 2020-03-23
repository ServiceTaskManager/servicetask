<template>
  <div>
    <text-field v-model="value.addr1"
      v-bind="{ label: 'Street name and number' }"
      icon-name="map" icon-color="grey" />
    <text-field v-model="address.addr2"
      v-bind="{ label: 'Address complement' }"
      icon-name="map" icon-color="grey" />
    <div class="row">
      <div class="col-4">
        <text-field v-model="address.postal_code"
          v-bind="{ label: 'Postal code' }"
          icon-name="location_city"
          icon-color="grey" />
      </div>
      <div class="col-8">
        <text-field v-model="address.city"
          v-bind="{ label: 'City' }" icon-color="grey" />
      </div>
    </div>
    <text-field v-model="address.country"
      v-bind="{ label: 'Country' }"
      icon-name="flag" icon-color="grey" />
  </div>
</template>

<script>
export default {
  text: 'AddressField',
  props: {
    value: {
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
    icontext: {
      type: String,
      default: 'text'
    },
    iconColor: {
      type: String,
      default: 'black'
    }
  },
  data () {
    return {
      address: this.value
    }
  },
  components: {
    TextField: () => import('./TextField')
  }
}
</script>
