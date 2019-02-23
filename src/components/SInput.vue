<template>
  <q-input
    dense
    standout
    v-model='value'
    :label="settings.label" />
</template>

<script>
import { QInput } from 'quasar'

export default {
  name: 'SInput',
  props: ['settings'],
  data () {
    return {
      value: ''
    }
  },
  created () {
    this.$root.$on('claimValue', cb => this.pushValue(cb))
  },
  methods: {
    pushValue () {
      console.log('Giving value to SForm ' + this.value)
      this.$root.$emit('pushValue', this.value)
    }
  },
  components: {
    QInput
  }
}
</script>
