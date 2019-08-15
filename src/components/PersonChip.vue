<template>
  <q-chip v-bind="$attrs" v-on="$listeners" class="full-width">
    <q-avatar :color="meta.color" :icon="meta.icon" />
    {{ person }}
  </q-chip>
</template>

<script>
export default {
  name: 'PersonChip',
  props: {
    person: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      meta: this.$store.state.users.meta
    }
  }
}
</script>
