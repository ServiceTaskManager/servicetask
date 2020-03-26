<template>
  <q-chip v-bind="$attrs" v-on="$listeners"
    clickable
    @click.prevent="$router.push({ name: 'engine', params: { id: engine.id }})"
    style="overflow: hidden;">
    <q-avatar :color="meta.color" :icon="meta.icon" />
    {{ engine.name }}
    <q-badge :label="customerData.name" color="white" class="q-ml-sm text-black" v-if="customer" />
    <q-badge :label="'SN/' + engine.sn" color="white" class="q-ml-sm text-black" v-if="SN" />
  </q-chip>
</template>

<script>
export default {
  name: 'EngineChip',
  props: {
    engine: {
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
      meta: this.$store.state.engines.meta
    }
  },
  computed: {
    customerData () {
      return this.$customers[this.engine.id]
    }
  }
}
</script>
