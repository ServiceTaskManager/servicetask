<template>
  <q-chip v-bind="$attrs" v-on="$listeners" class="full-width">
    <q-avatar :color="$models.user.meta.color" :icon="$models.user.meta.icon" />
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
    return {}
  }
}
</script>
