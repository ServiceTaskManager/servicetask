<template>
  <q-field>
    <q-toggle
      v-bind="$attrs"
      v-on="$attrs"
      :value="value"
      @input="$emit('input', $event)"
      class="full-width"
      spread
      stretch
      outline
      no-caps
      left-label
      :color="iconColor"
      text-color="black"
    />
    <template v-slot:prepend>
      <q-icon :name="iconName" :color="iconColor" />
    </template>
  </q-field>
</template>
<script>
export default {
  name: 'BooleanField',
  props: {
    value: {
      type: Boolean,
      default: true
    },
    iconName: {
      type: String,
      default: 'done'
    },
    iconColor: {
      type: String,
      default: 'black'
    }
  }
}
</script>
