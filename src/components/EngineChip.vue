<template>
  <q-chip v-bind="$attrs" v-on="$listeners" class="full-width">
    <q-avatar :color="meta.color" :icon="meta.icon" />
    {{ engine.type }}
    <q-badge :label="'SN/' + engine.sn" color="white" class="q-ml-sm text-black" />
  </q-chip>
</template>

<script>
export default {
  name: 'EngineChip',
  props: {
    engineId: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      meta: this.$store.state.engines.meta
    }
  },
  computed: {
    engine () {
      return this.engineId ? this.$store.state.engines.data[this.engineId] : this.$store.state.engines.default
    }
  }
}
</script>
