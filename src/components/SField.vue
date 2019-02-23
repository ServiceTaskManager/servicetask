<template>
  <s-select v-if="field.type == 'select'" :settings="field" />
  <s-input v-else-if="field.type == 'input'" :settings="field" />
  <p v-else>No field type defined</p>
</template>

<script>
import SSelect from './SSelect.vue'
import SInput from './SInput.vue'

export default {
  name: 'SField',
  props: ['field'],
  data () {
    return {

    }
  },
  components: {
    SSelect,
    SInput
  }
}
</script>
