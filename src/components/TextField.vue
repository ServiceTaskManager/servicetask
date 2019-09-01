<template>
  <q-input
    v-bind="$attrs"
    v-on="$listeners"
    color="black"
    :label="label"
    class="full-width">
    <template v-slot:prepend>
      <q-icon name="text" color="black" />
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
