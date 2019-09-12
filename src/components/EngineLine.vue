<template>
  <div>
    <q-tabs
      v-model="tab"
      dense no-caps
      class="text-teal"
      active-color="teal"
      indicator-color="teal"
      align="justify"
      narrow-indicator>
      <q-tab v-for="engine in mixinEngines"
        :key="engine.id"
        :name="engine.id"
        :icon="meta.icon"
        :label="engine.name"
        class="block" />
    </q-tabs>
    <q-tab-panels v-model="tab" class="rounded-borders">
      <q-tab-panel v-for="engine in mixinEngines"
        :key="engine.id"
        :name="engine.id">
        <engine-view :engine="engine" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import EngineView from './EngineView'

export default {
  name: 'EngineLine',
  props: {
    engine: {
      type: Object,
      default: () => {
        return {}
      }
    },
    show: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      tab: '',
      meta: this.$engines.meta
    }
  },
  mounted () {
    this.tab = this.show ? this.show : this.engine.id
  },
  computed: {
    mixinEngines () {
      let preDevices = this.$store.getters['engines/filter']({ id: ['includes', this.engine.pre_devices] })
      let postDevices = this.$store.getters['engines/filter']({ id: ['includes', this.engine.post_devices] })
      let mixin = preDevices.concat(this.engine, postDevices)
      return mixin
    }
  },
  components: {
    EngineView
  }
}
</script>
