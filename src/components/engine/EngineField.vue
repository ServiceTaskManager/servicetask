<template>
  <q-select use-input
    v-bind="$attrs"
    v-on="$attrs"
    :value="value"
    @input="$emit('input', $event.id)"
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

    <template v-slot:append v-if="value !== ''">
      <q-btn flat round icon="close" color="grey" @click="$emit('input', '')" />
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
      default: ''
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
      console.log(engine)
      return `${engine.type} ${engine.sn ? 'SN/' + engine.sn : ''}`
    }
  },
  components: {
    QSelect
  }
}
</script>
