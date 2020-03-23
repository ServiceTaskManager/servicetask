<template>
  <q-select
    :value="value"
    v-bind="$attrs"
    v-on="$listeners"
    color="black"
    :label="label"
    class="full-width">
    <template v-slot:prepend>
      <q-icon :name="iconName" :color="iconColor" />
    </template>
  </q-select>
</template>

<script>
export default {
  name: 'SelectField',
  props: {
    value: {
      type: [String, Array],
      default: () => {
        return []
      }
    },
    label: {
      type: String,
      default: 'Select'
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
