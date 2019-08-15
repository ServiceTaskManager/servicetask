<template>
  <q-select use-input
    v-bind="$attrs"
    v-on="$attrs"
    :value="value"
    @input="$emit('input', $event.id)"
    :color="meta.color"
    class="full-width"
    :options="customersFiltered"
    :display-value="displayValue"
    option-label="name"
    option-value="id"
    @filter="filter"
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
  name: 'CustomerField',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Customer'
    }
  },
  data () {
    return {
      meta: this.$store.state.customers.meta,
      customers: this.$store.state.customers.data,
      customersArray: Object.values(this.$store.state.customers.data),
      customersFiltered: Object.values(this.$store.state.customers.data)
    }
  },
  computed: {
    displayValue () {
      return this.value !== '' ? this.customers[this.value].name : ''
    }
  },
  methods: {
    filter (val, done) {
      done(() => {
        if (val !== '') {
          this.customersFiltered = this.customersArray.filter((c) => c.name.toLowerCase().indexOf(val.toLowerCase()) > -1)
        } else {
          this.customersFiltered = this.customersArray
        }
      })
    }
  },
  components: {
    QSelect
  }
}
</script>
