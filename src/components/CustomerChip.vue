<template>
  <q-chip v-bind="$attrs" v-on="$listeners"
    clickable
    @click.prevent="$router.push({ name: 'customer', params: { id: customerData.id } })"
    style="overflow: hidden;">
    <q-avatar :color="meta.color" :icon="meta.icon" />
    {{ customerData.name }}
  </q-chip>
</template>

<script>
export default {
  name: 'CustomerChip',
  props: {
    customerId: {
      type: String,
      default: undefined
    },
    customer: {
      type: Object,
      default: undefined
    }
  },
  data () {
    return {
      meta: this.$store.state.customers.meta
    }
  },
  computed: {
    customerData () {
      if (this.customer) return this.customer
      else return this.customerId ? this.$customers.data[this.customerId] : this.$customers.default
    }
  }
}
</script>
