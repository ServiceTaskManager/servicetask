<template>
  <q-select
    dense
    use-input
    color="tail"
    class="full-width"
    :display-value="displayValue"
    :value="value"
    @input="$emit('input', $event.id)"
    label="Engine"
    :readonly="readonly"
    :options="options"
    option-label="type"
    option-value="id">

    <template v-slot:prepend>
      <q-icon name="print" color="tail" />
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
    displayValue () {
      let display = this.value ? this.$store.state.engines.data[this.value].type : ''
      return display
    },
    options () {
      return this.getOptions()
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
