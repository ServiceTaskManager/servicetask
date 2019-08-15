<template>
  <div>
    <task-form @submit="submit" :task-id="$route.params.id" />
  </div>
</template>

<script>
import TaskForm from '../components/TaskForm.vue'

export default {
  name: 'TasksEdit',
  data () {
    return {}
  },
  methods: {
    submit () {
      this.$router.push({ name: 'tasks' })
    }
  },
  components: {
    TaskForm
  }
}
</script>
