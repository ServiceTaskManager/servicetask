<template>
  <q-chip v-bind="$attrs" v-on="$listeners"
    clickable
    @click.prevent="$router.push({ name: 'customer', params: { id: customer.id } })"
    style="overflow: hidden;">
    <q-avatar :color="$models.customer.meta.color" :icon="$models.customer.meta.icon" />
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
  }
}
</script>
