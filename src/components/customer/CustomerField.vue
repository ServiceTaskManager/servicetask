<template>
  <q-select use-input
    v-bind="$attrs"
    v-on="$attrs"
    :value="value"
    @input="$emit('input', $event.id)"
    :color="$customers.meta.color"
    class="full-width"
    :options="customersFiltered"
    :display-value="displayValue"
    option-label="name"
    option-value="id"
    @filter="filter"
    :label="label">

    <template v-slot:prepend>
      <q-icon :name="$customers.meta.icon" :color="$customers.meta.color" />
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
      customersFiltered: this.$store.getters['customers/filter']()
    }
  },
  computed: {
    displayValue () {
      return this.value === '' ? '' : this.$customers.data[this.value].name
    }
  },
  methods: {
    filter (val, done) {
      this.customersFiltered = this.$store.getters['customers/filter']([['name', 'contains', val]])
      done()
    }
  },
  components: {
    QSelect
  }
}
</script>
