<template>
  <q-btn-toggle
    v-bind="$attrs"
    v-on="$attrs"
    :value="value"
    @input="$emit('input', $event)"
    class="full-width"
    spread
    stretch
    outline
    no-caps
    toggle-color="primary"
    color="white"
    text-color="black"
    :options="options"
  />
</template>
<script>
export default {
  name: 'BooleanField',
  props: {
    value: {
      type: [Boolean, String],
      default: undefined
    },
    label: {
      type: String,
      default: 'Customer'
    },
    options: {
      type: Array,
      default: () => {
        return [{
          label: 'All',
          value: 'all'
        }, {
          label: 'Yes',
          value: true
        }, {
          label: 'No',
          value: false
        }]
      }
    }
  },
  data () {
    return {}
  }
}
</script>
