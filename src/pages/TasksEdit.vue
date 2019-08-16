<template>
  <div>
    <task-form @submit="$router.push({ name: 'tasks' })" @cancel="$router.push({ name: 'tasks' })" :task-id="$route.params.id" />
  </div>
</template>

<script>
import TaskForm from '../components/TaskForm.vue'

export default {
  name: 'TasksEdit',
  data () {
    return {}
  },
  components: {
    TaskForm
  }
}
</script>
