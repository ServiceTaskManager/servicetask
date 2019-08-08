<template>
  <div class="container">
    <div
      class="row q-col-gutter-sm">
      <div
        v-for="(task, key) in tasks"
        :key="key"
        class="col-12 col-sm-4">
        <card-task :task="task" />
      </div>
    </div>

    <q-btn
      fab
      :color="model.color"
      icon="add"
      class="fixed-bottom-right"
      style="margin-right: 10px; margin-bottom: 10px"
      @click="createTask" />
  </div>
</template>

<script>
import CardTask from '../components/CardTask'

export default {
  name: 'Tasks',
  data () {
    return {
      tasks: {}
    }
  },
  mounted () {
    this.tasks = this.$store.state.tasks.data
  },
  computed: {
    model () {
      return this.$store.state.tasks
    }
  },
  methods: {
    createTask () {
      this.$store.dispatch('tasks/set', { create: true, engine: '' })
    }
  },
  components: {
    CardTask
  }
}
</script>
