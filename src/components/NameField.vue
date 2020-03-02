<template>
  <q-input
    v-bind="$attrs"
    v-on="$listeners"
    color="black"
    :label="label"
    class="full-width">
    <template v-slot:prepend>
      <q-icon name="title" color="black" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'NameField',
  props: {
    label: {
      type: String,
      default: ''
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
