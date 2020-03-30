<template>
  <q-chip v-bind="$attrs" v-on="$listeners"
    clickable
    @click.prevent="$router.push({ name: 'machine', params: { id: machine.id }})"
    style="overflow: hidden;">
    <q-avatar :color="meta.color" :icon="meta.icon" />
    {{ machine.name }}
    <q-badge :label="customerData.name" color="white" class="q-ml-sm text-black" v-if="customer" />
    <q-badge :label="'SN/' + machine.sn" color="white" class="q-ml-sm text-black" v-if="SN" />
  </q-chip>
</template>

<script>
export default {
  name: 'MachineChip',
  props: {
    machine: {
      type: Object,
      default: undefined,
      required: true
    },
    customer: {
      type: Boolean,
      default: false
    },
    SN: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      meta: this.$models.machine.meta
    }
  },
  computed: {
    customerData () {
      return this.$customers[this.machine.id]
    }
  }
}
</script>
