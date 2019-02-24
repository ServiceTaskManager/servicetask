<template>
  <q-input
    dense
    standout
    v-model='value'
    v-on:input='settings.value = value'
    :label="settings.label" />
</template>

<script>
import { QInput } from 'quasar'

export default {
  name: 'SInput',
  props: ['settings', 'form'],
  data () {
    return {
      value: null
    }
  },
  components: {
    QInput
  }
}
</script>
