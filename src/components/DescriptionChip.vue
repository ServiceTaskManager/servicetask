<template>
  <q-chip v-bind="$attrs" v-on="$listeners" class="full-width">
    <q-avatar color="grey" icon="description" />
    {{ description }}
  </q-chip>
</template>

<script>
export default {
  name: 'DescriptionChip',
  props: {
    description: {
      type: String,
      default: 'Description'
    }
  },
  data () {
    return {}
  }
}
</script>
