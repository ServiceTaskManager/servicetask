<template>
  <q-input
    v-bind="$attrs"
    v-on="$listeners"
    color="black"
    :label="label"
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
    label: {
      type: String,
      default: 'Text'
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
