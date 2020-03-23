<template>
  <q-chip v-bind="$attrs" v-on="$listeners"
    clickable
    @click.prevent="$router.push({ name: 'customer', params: { id: customer.id } })"
    style="overflow: hidden;">
    <q-avatar :color="meta.color" :icon="meta.icon" />
    {{ customer.name }}
  </q-chip>
</template>

<script>
export default {
  name: 'CustomerChip',
  props: {
    customer: {
      type: Object,
      default: undefined
    }
  },
  data () {
    return {
      meta: this.$customers.meta
    }
  }
}
</script>
