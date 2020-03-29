<template>
  <q-layout container view="hHh Lpr lff" style="height: calc(100vh - 50px)">
    <q-drawer v-model="drawer" side="left" bordered behavior="mobile">
      <q-scroll-area class="fit q-pa-sm">
        <st-form v-model="taskToEdit" store="tasks" @submit="drawer = false">
          <template #buttons>
            <q-btn v-if="taskToEdit === undefined"
              label="Reset"
              type="reset"
              :color="$tasks.meta.color"
              flat
              class="q-ml-sm" />
            <q-btn
              :label="taskToEdit ? 'Save' : 'Create'"
              type="submit"
              :color="$tasks.meta.color" />
          </template>
        </st-form>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page>
        <calendar @task-click="openEditDrawer" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style>
.q-current-day {
  background-color: white;
}
</style>

<script>
export default {
  name: 'CalendarPage',
  data () {
    return {
      taskToEdit: undefined,
      drawer: false
    }
  },
  methods: {
    openEditDrawer (task) {
      this.drawer = true
      this.taskToEdit = task
    }
  },
  components: {
    Calendar: () => import('../components/generic/Calendar'),
    StForm: () => import('../components/generic/StForm')
  }
}
</script>
