<template>
  <q-select use-input
    v-bind="$attrs"
    v-on="$attrs"
    :value="value"
    @input="$emit('input', $event.value)"
    color="black"
    class="full-width"
    :options="options"
    option-label="label"
    option-value="value"
    :label="label">

    <template v-slot:prepend>
      <q-icon name="?" color="black" />
    </template>
  </q-select>
</template>

<script>
import { QSelect } from 'quasar'

export default {
  name: 'BooleanField',
  props: {
    value: {
      type: Boolean,
      default: undefined
    },
    label: {
      type: String,
      default: 'Customer'
    }
  },
  data () {
    return {
      options: [{
        label: 'All',
        value: ''
      }, {
        label: 'Yes',
        value: true
      }, {
        label: 'No',
        value: false
      }]
    }
  },
  components: {
    QSelect
  }
}
</script>
