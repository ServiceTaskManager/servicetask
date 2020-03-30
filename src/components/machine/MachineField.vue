<template>
  <q-select use-input clearable
    v-bind="$attrs"
    v-on="$attrs"
    :value="value"
    @input="onInput"
    :display-value="value ? displayName(machines[value]) : ''"
    :color="meta.color"
    class="full-width"
    :options="machinesFiltered"
    :option-label="opt => displayName(opt)"
    option-value="id">

    <template v-slot:prepend>
      <q-icon :name="meta.icon" :color="meta.color" />
    </template>

    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { QSelect } from 'quasar'

export default {
  name: 'MachineField',
  props: {
    value: {
      type: String,
      default: ''
    },
    customer: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      meta: this.$models.machine.meta,
      machines: this.$machines.data
    }
  },
  computed: {
    machinesFiltered () {
      return this.$store.getters['machines/filter']([['customer', '==', this.customer]])
    }
  },
  methods: {
    displayName (machine) {
      return `${machine.type} ${machine.sn ? 'SN/' + machine.sn : ''}`
    },
    onInput (val) {
      const id = val ? val.id : ''
      this.$emit('input', id)
    }
  },
  components: {
    QSelect
  }
}
</script>
