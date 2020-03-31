<template>
  <div>
    <text-field :value="value.addr1"
      @input="$emit('input', { ...value, addr1: $event })"
      v-bind="{ ...$attrs, label: $t('components.addressfield.addr1.label') }"
      icon-name="map" icon-color="grey" />
    <text-field :value="value.addr2"
      @input="$emit('input', { ...value, addr2: $event })"
      v-bind="{ ...$attrs, label: $t('components.addressfield.addr2.label') }"
      icon-name="map" icon-color="grey" />
    <div class="row">
      <div class="col-4">
        <text-field :value="value.postal_code"
          @input="$emit('input', { ...value, postal_code: $event })"
          v-bind="{ ...$attrs, label: $t('components.addressfield.postalcode.label') }"
          icon-name="location_city"
          icon-color="grey" />
      </div>
      <div class="col-8">
        <text-field :value="value.city"
          @input="$emit('input', { ...value, city: $event })"
          v-bind="{ ...$attrs, abel: $t('components.addressfield.city.label') }" icon-color="grey" />
      </div>
    </div>
    <text-field :value="value.country"
      @input="$emit('input', { ...value, country: $event })"
      v-bind="{ ...$attrs, label: $t('components.addressfield.country.label') }"
      icon-name="flag" icon-color="grey" />
  </div>
</template>

<script>
export default {
  name: 'AddressField',
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
  components: {
    TextField: () => import('./TextField')
  }
}
</script>
