<template>
  <q-select
    use-input
    :color="store.color"
    class="full-width"
    :display-value="displayValue"
    :value="value"
    @input="$emit('input', $event.id)"
    label="Engine"
    :readonly="readonly"
    :options="options"
    :option-label="opt => opt.type + ' SN/' + opt.sn"
    option-value="id">

    <template v-slot:prepend>
      <q-icon :name="store.icon" :color="store.color" />
    </template>

    <template v-slot:no-option>
      <q-item dense>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { QSelect, QItem } from 'quasar'
export default {
  name: 'SelectEngine',
  props: ['readonly', 'value', 'customer'],
  data () {
    return {}
  },
  computed: {
    options () {
      return this.getOptions()
    },
    store () {
      return this.$store.state.engines
    },
    default () {
      return this.store.default
    },
    data () {
      return this.store.data[this.value]
    },
    displayValue () {
      return this.value ? this.data.type + ' SN/' + this.data.sn : ''
    }
  },
  methods: {
    getOptions () {
      let options = Object.values(this.$store.state.engines.data).filter((v) => {
        return v.customer === this.customer
      })
      return options
    }
  },
  components: {
    QSelect,
    QItem
  }
}
</script>
