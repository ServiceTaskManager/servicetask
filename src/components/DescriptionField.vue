<template>
  <q-input
    v-bind="$attrs"
    v-on="$listeners"
    class="full-width"
    :label="label"
    @input="$emit('input')">
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
    return {
      meta: {
        icon: 'description',
        color: 'grey'
      }
    }
  }
}
</script>
