<template>
  <q-layout container view="hHh Lpr lff" style="height: calc(100vh - 50px)">
    <q-drawer v-model="drawer" side="left" bordered class="q-pa-md">
      <q-scroll-area class="fit q-pa-sm">
        <store-form :data="taskToEdit" store="tasks">
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
        <q-calendar
          v-model="selectedDate"
          view="week"
          :weekdays="[1, 2, 3, 4, 5]"
          interval-start="6"
          interval-count="14"
          hour24-format
          style="height: 800px">
          <template #day-body="{ day, timeStartPos, timeDurationHeight }">
            <template v-for="(event, key) in events(day)">
              <calendar-event :key="key"
                class="absolute rotate-90"
                :event="event"
                :style="eventStyle(event, timeStartPos, timeDurationHeight)"
                @click="openEditDrawer(event.task)" />
            </template>
          </template>
        </q-calendar>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Calendar',
  data () {
    return {
      selectedDate: '',
      taskToEdit: undefined,
      drawer: false
    }
  },
  methods: {
    events (day) {
      let busyRow = []

      const tasks = this.$store.getters['tasks/filter']()
      let events = []
      tasks.forEach(t => {
        t.time_shifts.forEach(s => {
          if (parseInt(moment(s.start).format('DD')) === day) {
            // Calculate if row is busy
            let row = 0
            let placed = true
            while (placed) {
              if (busyRow[row] === undefined) busyRow[row] = []
              if (this.rowIsBusy(busyRow[row], s)) row++
              else {
                busyRow[row].push(s)
                placed = false
              }
            }

            events.push({
              row: row,
              time: moment(s.start).format('HH:mm'),
              duration: moment(s.end).diff(moment(s.start), 'minutes'),
              icon: 'add',
              task: t
            })
          }
        })
      })
      return events
    },
    eventStyle (event, timeStartPos, timeDurationHeight) {
      let s = {}
      s.top = timeStartPos(event.time) + 'px'
      s.left = `${28 * (event.row + 1)}px`
      s.width = timeDurationHeight(event.duration) + 'px'
      s['max-width'] = timeDurationHeight(event.duration) + 'px'
      s['transform-origin'] = 'top left'
      return s
    },
    rowIsBusy (busyRow, s) {
      let busy = false
      busyRow.forEach(busyTime => {
        if (moment(s.start).isBetween(moment(busyTime.start), moment(busyTime.end))) busy = true
        if (moment(s.end).isBetween(moment(busyTime.start), moment(busyTime.end))) busy = true
        if (moment(s.start).isSame(moment(busyTime.start))) busy = true
      })
      return busy
    },
    openEditDrawer (task) {
      this.drawer = true
      this.taskToEdit = task
    }
  },
  components: {
    CalendarEvent: () => import('../components/generic/CalendarEvent'),
    StoreForm: () => import('../components/generic/StoreForm')
  }
}
</script>
