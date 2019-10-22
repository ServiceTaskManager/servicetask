<template>
  <q-item class="q-pa-xs" :to="{ name: 'customer', params: { id: customer.id } }">
    <q-item-section avatar>
      <q-avatar :color="$customers.meta.color" :icon="$customers.meta.icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-bold">
        {{ customer.name }}
      </q-item-label>
      <q-item-label caption lines="1">
        <address-chip dense :address="customer.address"
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
        return {}
      }
    }
  },
  data () {
    return {}
  },
  components: {
    AddressChip
  }
}
</script>
