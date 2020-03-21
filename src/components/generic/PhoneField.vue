<template>
  <q-input
    v-bind="$attrs"
    v-on="$listeners"
    :color="meta.color"
    class="full-width"
    type="tel"
    :label="label">
    <template v-slot:prepend>
      <q-icon :name="meta.icon" :color="meta.color" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'PhoneField',
  props: {
    label: {
      type: String,
      default: 'Phone number'
    }
  },
  data () {
    return {
      meta: this.$store.state.users.meta
    }
  }
}
</script>
