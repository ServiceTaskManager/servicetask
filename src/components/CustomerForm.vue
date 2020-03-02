<template>
  <q-form class="full-width">
    <name-field v-model="customerData.name" v-bind="fields.name" />
    <div v-if="'address' in fields">
      <name-field v-model="customerData.address.addr1" v-bind="{ label: 'Address' }" />
      <name-field v-model="customerData.address.addr2" v-bind="{ label: 'Address' }" />
      <div class="row">
        <div class="col-4">
          <name-field v-model="customerData.address.postal_code" v-bind="{ label: 'Postal code' }" />
        </div>
        <div class="col-8">
          <name-field v-model="customerData.address.city" v-bind="{ label: 'City' }" />
        </div>
      </div>
      <name-field v-model="customerData.address.country" v-bind="{ label: 'Country' }" />
    </div>
      <phone-field v-model="customerData.phone" v-bind="fields.phone" />
      <name-field v-model="customerData.email" v-bind="fields.email" />
  </q-form>
</template>

<script>
export default {
  name: 'CustomerForm',
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    fields: {
      type: Object,
      default: () => {
        return {
          name: { label: 'Customer name' },
          address: {},
          phone: { label: 'Customer main phone number' },
          email: { label: 'Email address' }
        }
      }
    }
  },
  data () {
    return {
      customerData: {
        address: {}
      }
    }
  },
  mounted () {
    this.customerData = Object.assign({},
      this.$customers.default,
      this.value)
  },
  watch: {
    customerData: function (val) {
      this.$emit('input', val)
    }
  },
  components: {
    NameField: () => import('./NameField'),
    PhoneField: () => import('./PhoneField')
  }
}
</script>
