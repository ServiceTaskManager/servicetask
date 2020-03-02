<template>
  <q-input
    v-bind="$attrs"
    v-on="$listeners"
    color="grey"
    class="full-width"
    :label="label"
    type="textarea">
    <template v-slot:prepend>
      <q-icon name="description" color="grey" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'DescriptionField',
  props: {
    label: {
      type: String,
      default: 'Description'
    }
  },
  data () {
    return {}
  }
}
</script>
