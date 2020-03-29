<template>
  <q-layout container view="hHh Lpr lff" style="height: calc(100vh - 50px)">
    <q-drawer v-model="drawer" side="left" bordered behavior="mobile">
      <q-scroll-area class="fit q-pa-sm">
        <st-form v-model="taskToEdit" model="task" @submit="drawer = false" />
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page>
        <calendar @task-click="openEditDrawer" ref="calendar" />
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
