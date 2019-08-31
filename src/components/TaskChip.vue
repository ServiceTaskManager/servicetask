<template>
  <q-chip v-bind="$attrs" v-on="$listeners" class="full-width">
    <q-avatar :color="meta.color" :icon="meta.icon" />
    {{ taskData.title }}
  </q-chip>
</template>

<script>
export default {
  name: 'TaskChip',
  props: {
    taskId: {
      type: String,
      default: undefined
    },
    task: {
      type: Object,
      default: undefined
    }
  },
  data () {
    return {
      meta: this.$store.state.tasks.meta
    }
  },
  computed: {
    tasksData () {
      if (this.task) return this.task
      else return this.taskId ? this.$store.state.tasks.data[this.taskId] : this.$store.state.tasks.default
    }
  }
}
</script>
