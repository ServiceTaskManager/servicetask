<template>
  <q-input
    v-bind="$attrs"
    v-on="$listeners"
    :color="meta.color"
    class="full-width"
    :label="label">
    <template v-slot:prepend>
      <q-icon :name="meta.icon" :color="meta.color" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'EngineField',
  props: {
    label: {
      type: String,
      default: 'Contact name'
    }
  },
  data () {
    return {
      meta: this.$store.state.users.meta
    }
  }
}
</script>
