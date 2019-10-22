<template>
  <q-item class="q-pa-xs" :to="{ name: 'engine', params: { id: engine.id }}">
    <q-item-section avatar>
      <q-avatar color="teal" icon="print" />
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-bold">
        {{ engine.name }}
        <q-badge :label="'SN ' + engine.sn" color="grey" />
      </q-item-label>
      <q-item-label caption lines="1">
        <customer-chip :customer="customer" dense v-if="customer && !hideCustomer" />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import CustomerChip from './CustomerChip'
export default {
  name: 'EngineItem',
  props: {
    engine: {
      type: Object,
      default: () => {
        return this.$store.state.engines.default
      }
    },
    hideCustomer: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    customer () {
      return this.$store.state.customers.data[this.engine.customer]
    }
  },
  components: {
    CustomerChip
  }
}
</script>
