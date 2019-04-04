<template>
  <q-select
    dense
    use-input
    color="pink"
    class="full-width"
    :display-value="displayValue"
    :value="value"
    @input="$emit('input', $event.id)"
    label="Customer"
    :readonly="readonly"
    :options="options"
    option-label="name"
    option-value="id"
    @filter="filter">

    <template v-slot:prepend>
      <q-icon name="people" color="pink" />
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
  name: 'SelectCustomer',
  props: ['readonly', 'value'],
  data () {
    return {
      options: null
    }
  },
  mounted () {
    this.options = this.getOptions()
  },
  computed: {
    displayValue () {
      return this.value ? this.$store.state.customers.data[this.value].name : this.$store.state.model.models.customers.default.name
    }
  },
  methods: {
    filter (val, done) {
      done(() => {
        if (val !== '') {
          let needle = val.toLowerCase()
          this.options = this.getOptions().filter((v) => {
            return v.name !== undefined ? (v.name.toLowerCase().indexOf(needle) > -1) : false
          })
        } else {
          this.options = this.getOptions()
        }
      })
    },
    getOptions () {
      let options = Object.values(this.$store.state.customers.data)
      return options
    }
  },
  components: {
    QSelect,
    QItem
  }
}
</script>
