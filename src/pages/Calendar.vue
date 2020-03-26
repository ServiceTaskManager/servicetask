<template>
  <q-layout container view="hHh Lpr lff" style="height: calc(100vh - 50px)">
    <q-drawer v-model="drawer" side="left" bordered>
      <q-scroll-area class="fit q-pa-sm">
        <store-form :data="taskToEdit" store="tasks" @input="drawer = false">
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
        </store-form>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page>
        <calendar @editTask="openEditDrawer" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

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
    StoreForm: () => import('../components/generic/StoreForm')
  }
}
</script>
