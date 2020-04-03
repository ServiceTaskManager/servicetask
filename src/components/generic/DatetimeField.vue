<template>
  <q-datetime-picker
    :value="value"
    @input="$emit('input')"
    v-bind="$attrs"
    v-on="$listeners"
    color="black"
    class="full-width"
    target="self">
    <template v-slot:prepend>
      <q-icon :name="iconName" :color="iconColor" />
    </template>
  </q-datetime-picker>
</template>

<script>
export default {
  name: 'DatetimeField',
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
