<template>
  <q-chip v-bind="$attrs" v-on="$listeners"
    clickable
    @click.prevent="$router.push({ name: 'engine', params: { id: engineData.id }})"
    style="overflow: hidden;">
    <q-avatar :color="meta.color" :icon="meta.icon" />
    {{ engineData.name }}
    <q-badge :label="customerData.name" color="white" class="q-ml-sm text-black" v-if="customer" />
    <q-badge :label="'SN/' + engineData.sn" color="white" class="q-ml-sm text-black" v-if="SN" />
  </q-chip>
</template>

<script>
export default {
  name: 'EngineChip',
  props: {
    engineId: {
      type: String,
      default: undefined
    },
    engine: {
      type: Object,
      default: undefined
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
    engineData () {
      if (this.engine) return this.engine
      else return this.engineId ? this.$store.state.engines.data[this.engineId] : this.$store.state.engines.default
    },
    customerData () {
      return this.$store.state.customers.data[this.engineData.id]
    }
  }
}
</script>
