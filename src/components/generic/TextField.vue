<template>
  <q-input
    :value="value"
    @input="$emit('input')"
    v-bind="$attrs"
    v-on="$listeners"
    color="black"
    class="full-width">
    <template v-slot:prepend>
      <q-icon :name="iconName" :color="iconColor" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    value: {
      type: String,
      default: ''
    },
    iconName: {
      type: String,
      default: 'text'
    },
    iconColor: {
      type: String,
      default: 'black'
    }
  }
}
</script>
