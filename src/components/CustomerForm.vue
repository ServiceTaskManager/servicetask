<template>
  <q-list class="full-width">
    <q-item v-if="'name' in fields">
      <name-field v-model="customerData.name" v-bind="fields.name" />
    </q-item>
    <div v-if="'address' in fields">
      <q-item>
        <name-field v-model="customerData.address.addr1" v-bind="{ label: 'Address', icon: 'pin' }" />
      </q-item>
      <q-item>
        <name-field v-model="customerData.address.addr2" v-bind="{ label: 'Address' }" />
      </q-item>
      <q-item class="row">
        <div class="col-3">
          <name-field v-model="customerData.address.postal_code" v-bind="{ label: 'Postal code' }" />
        </div>
        <div class="col-9">
          <name-field v-model="customerData.address.city" v-bind="{ label: 'City' }" />
        </div>
      </q-item>
      <q-item>
        <name-field v-model="customerData.address.country" v-bind="{ label: 'Country' }" />
      </q-item>
    </div>
    <q-item v-if="'phone' in fields">
      <phone-field v-model="customerData.phone" v-bind="fields.phone" />
    </q-item>
    <q-item v-if="'email' in fields">
      <name-field v-model="customerData.email" v-bind="fields.email" />
    </q-item>

    <q-item class="row justify-end">
      <q-btn rounded flat
        color="grey"
        icon="undo"
        @click="$emit('cancel')" />
      <q-btn rounded
        color="positive"
        label="Submit"
        type="submit"
        icon="done"
        @click="set" />
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'CustomerForm',
  props: {
    customerId: {
      type: String,
      default: undefined
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
    },
    customer: {
      type: Object,
      default: () => {
        return {}
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
      this.customer,
      this.$customers.data[this.customerId])
  },
  methods: {
    set () {
      this.$store.dispatch('customers/set', this.customerData)
      this.$emit('submit')
    }
  },
  components: {
    NameField: () => import('./NameField'),
    PhoneField: () => import('./PhoneField')
  }
}
</script>
