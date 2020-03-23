<template>
  <q-input
    :value="text"
    @input="text = $event"
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
    value: {
      type: String,
      default: ''
    },
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
  },
  data () {
    return {
      text: this.value
    }
  }
}
</script>
