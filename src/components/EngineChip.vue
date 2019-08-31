<template>
  <q-chip v-bind="$attrs" v-on="$listeners" class="full-width">
    <q-avatar :color="meta.color" :icon="meta.icon" />
    {{ engineData.name }}
    <q-badge :label="'SN/' + engineData.sn" color="white" class="q-ml-sm text-black" />
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
    }
  }
}
</script>
