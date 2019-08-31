<template>
  <q-list>
    <task-item
      v-for="task in tasks"
      :key="task.id"
      :task="task" />
  </q-list>
</template>

<script>
import TaskItem from './TaskItem'
export default {
  name: 'TaskList',
  props: {
    filters: {
      type: Object,
      default: () => {
        return {
          done: false
        }
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    tasks () {
      return this.$store.getters['tasks/filter'](this.filters)
    }
  },
  components: {
    TaskItem
  }
}
</script>
