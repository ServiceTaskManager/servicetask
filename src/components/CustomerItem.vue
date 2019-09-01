<template>
  <q-item class="q-pa-xs" :to="{ name: 'customersView', params: { id: customer.id } }">
    <q-item-section avatar>
      <q-avatar :color="meta.color" :icon="meta.icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-bold">
        {{ customer.name }}
      </q-item-label>
      <q-item-label caption lines="1">
        <address-chip dense :address="{
          addr1: customer.addr1,
          addr2: customer.addr2,
          postal_code: customer.postal_code,
          city: customer.city,
          country: customer.country}"
          :show="['city', 'country']" />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import AddressChip from './AddressChip'

export default {
  name: 'CustomerItem',
  props: {
    customer: {
      type: Object,
      default: () => {
        return this.$store.state.customers.default
      }
    }
  },
  data () {
    return {
      meta: this.$store.state.customers.meta
    }
  },
  components: {
    AddressChip
  }
}
</script>
