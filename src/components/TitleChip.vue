<template>
  <q-chip v-bind="$attrs" v-on="$listeners" class="full-width text-bold">
    <q-avatar color="grey" icon="title" />
    {{ title }}
  </q-chip>
</template>

<script>
export default {
  name: 'TitleChip',
  props: {
    title: {
      type: String,
      default: 'Title'
    }
  },
  data () {
    return {}
  }
}
</script>
