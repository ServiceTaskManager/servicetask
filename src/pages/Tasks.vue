<template>
  <q-page padding class="justify-center">
    <q-list bordered class="rounded-borders">
      <q-item
        v-for="task in tasks"
        :key="task.id">
        <q-item-section avatar top>
          <q-icon name="done" color="positive" size="34px" v-if="task.status == 'close'" />
          <q-icon name="warning" color="negative" size="34px" v-else-if="!task.assigned_to" />
          <q-icon name="assignment_ind" color="warning" size="34px" v-else-if="task.assigned_to" />
        </q-item-section>

        <q-item-section top class="col-2 gt-sm">
          <q-item-label lines="1">
            <span class="text-weight-bold">{{ task.customer.name }}</span>
          </q-item-label>
          <q-item-label caption lines="1">
            <span class="gt-xs text-grey-8"></span>
          </q-item-label>
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="1" class="lt-md">
            <span class="text-weight-bold">{{ task.customer.name }}</span>
          </q-item-label>
          <q-item-label lines="1">
            <span class="text-weight-medium">{{ task.title }}</span>
          </q-item-label>
          <q-item-label lines="1">
            <q-btn color="positive">
              <q-icon left name="phone" />
              <div class="gt-xs">{{ task.phone_number }}</div>
            </q-btn> {{ task.teamviewer_id }} {{ task.status }}
          </q-item-label>
        </q-item-section>

        <q-item-section top side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" flat dense round icon="assignment_ind" />
            <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
            <q-btn class="gt-xs" size="12px" flat dense round icon="edit" />
            <q-btn size="12px" flat dense round icon="more_vert" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { openURL, date } from 'quasar'

export default {
  name: 'tasks',
  data () {
    return {
      taskForm: {}
    }
  },
  computed: {
    tasks () {
      return this.$store.state.task.data
    }
  },
  methods: {
    openURL,
    formatDate (dateInput) {
      return date.formatDate(dateInput, 'DD/MM HH:MM')
    }
  }
}
</script>

<style>
</style>
