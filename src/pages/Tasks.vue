<template>
  <div class="container">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator>
        <q-tab name="todo" icon="list" label="To do list">
          <q-badge :label="stats.todo" floating></q-badge>
        </q-tab>
        <q-tab name="done" icon="done" label="Done">
          <q-badge :label="stats.done" floating></q-badge>
        </q-tab>
      </q-tabs>
      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="todo">
          <task-list :filters="tasksToDoFilters" />
        </q-tab-panel>
        <q-tab-panel name="done">
          <task-list :filters="tasksDoneFilters" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" :color="$tasks.meta.color" @click="taskCreate = true" />
    </q-page-sticky>
    <task-edit-dialog v-model="taskCreate" />
  </div>
</template>

<script>
import TaskList from '../components/TaskList'
import TaskEditDialog from '../components/TaskEditDialog'

export default {
  name: 'Tasks',
  data () {
    return {
      tab: 'todo',
      taskCreate: false,
      tasksToDoFilters: { done: ['==', false] },
      tasksDoneFilters: { done: ['==', true] }
    }
  },
  computed: {
    stats () {
      return this.$store.getters['tasks/stats']
    }
  },
  components: {
    TaskList,
    TaskEditDialog
  }
}
</script>
