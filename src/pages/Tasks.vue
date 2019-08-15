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
        <q-tab name="todo" icon="list" label="Incoming call">
          <q-badge :label="stats.todo" floating></q-badge>
        </q-tab>
        <q-tab name="done" icon="done" label="Assigned">
          <q-badge :label="stats.done" floating></q-badge>
        </q-tab>
      </q-tabs>
      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="todo">
          <q-list>
            <task-item
              v-for="task in $store.getters['tasks/todo']"
              :key="task.id"
              :id="task.id"
              :task="task" />
          </q-list>
        </q-tab-panel>
        <q-tab-panel name="done">
          <q-list>
            <task-item
              v-for="task in $store.getters['tasks/done']"
              :key="task.id"
              :id="task.id"
              :task="task" />
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="black" :to="{ name: 'tasksCreate', params: { id: undefined } }" />
    </q-page-sticky>
  </div>
</template>

<script>
import TaskItem from '../components/TaskItem'
export default {
  name: 'Tasks',
  data () {
    return {
      tab: 'todo'
    }
  },
  computed: {
    stats () {
      return this.$store.getters['tasks/stats']
    }
  },
  components: {
    TaskItem
  }
}
</script>
