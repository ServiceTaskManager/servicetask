<template>
  <q-chip v-bind="$attrs" v-on="$listeners" class="full-width">
    <q-avatar :color="meta.color" :icon="$models.task.meta.icon" />
    {{ task.title }}
  </q-chip>
</template>

<script>
export default {
  name: 'TaskChip',
  props: {
    task: {
      type: Object,
      default: undefined
    }
  }
}
</script>
