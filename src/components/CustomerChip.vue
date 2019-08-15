<template>
  <q-chip v-bind="$attrs" v-on="$listeners" class="full-width">
    <q-avatar :color="meta.color" :icon="meta.icon" />
    {{ customer.name }}
  </q-chip>
</template>

<script>
export default {
  name: 'CustomerChip',
  props: {
    customerId: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      meta: this.$store.state.customers.meta
    }
  },
  computed: {
    customer () {
      return this.customerId ? this.$store.state.customers.data[this.customerId] : this.$store.state.customers.default
    }
  }
}
</script>
