<template>
  <q-item>
    <customer-chip :customer="customer" />
  </q-item>
</template>

<script>
import CustomerChip from './CustomerChip'

export default {
  name: 'CustomerItem',
  props: {
    customer: {
      type: Object,
      default: () => {
        return this.$store.state.calls.default
      }
    }
  },
  data () {
    return {}
  },
  components: {
    CustomerChip
  }
}
</script>
