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
      <q-tab v-for="machine in mixinMachines"
        :key="machine.id"
        :name="machine.id"
        :icon="meta.icon"
        :label="machine.name"
        class="block" />
    </q-tabs>
    <q-tab-panels v-model="tab" class="rounded-borders">
      <q-tab-panel v-for="machine in mixinMachines"
        :key="machine.id"
        :name="machine.id">
        <machine-view :machine="machine" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import MachineView from './MachineView'

export default {
  name: 'MachineLine',
  props: {
    machine: {
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
      meta: this.$models.machine.meta
    }
  },
  mounted () {
    this.tab = this.show ? this.show : this.machine.id
  },
  computed: {
    mixinMachines () {
      let preDevices = this.$store.getters['machines/filter']([['id', 'includes', (this.machine.pre_devices || [])]])
      let postDevices = this.$store.getters['machines/filter']([['id', 'includes', (this.machine.post_devices || [])]])
      let mixin = preDevices.concat(this.machine, postDevices)
      return mixin
    }
  },
  components: {
    MachineView
  }
}
</script>
