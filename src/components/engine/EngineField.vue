<template>
  <q-select use-input clearable
    v-bind="$attrs"
    v-on="$attrs"
    :value="value"
    @input="onInput"
    :display-value="value ? displayName(engines[value]) : ''"
    :color="meta.color"
    class="full-width"
    :options="enginesFiltered"
    :option-label="opt => displayName(opt)"
    option-value="id"
    :label="label">

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
  name: 'EngineField',
  props: {
    value: {
      type: String,
      default: ''
    },
    customer: {
      type: String,
      default: undefined
    },
    label: {
      type: String,
      default: 'Engine'
    }
  },
  data () {
    return {
      meta: this.$engines.routes[0].meta,
      engines: this.$engines.data
    }
  },
  computed: {
    enginesFiltered () {
      return this.$store.getters['engines/filter']([['customer', '==', this.customer]])
    }
  },
  methods: {
    displayName (engine) {
      return `${engine.type} ${engine.sn ? 'SN/' + engine.sn : ''}`
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
