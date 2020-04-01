<template>
  <q-calendar fit
    v-model="selectedDate"
    view="week"
    :weekdays="[1, 2, 3, 4, 5]"
    interval-start="6"
    interval-count="14"
    hour24-format
    ref="QCalendar"
    :locale="$i18n.locale"
    day-height="0"
    :interval-height="intervalHeight">
    <template #day-body="{ date, timeStartPos, timeDurationHeight }">
      <template v-for="(event, key) in events(date)">
        <calendar-event :key="key"
          class="absolute rotate-90"
          :event="event"
          :style="eventStyle(event, timeStartPos, timeDurationHeight)"
          @click="$emit('task-click', event.task)" />
      </template>
    </template>
  </q-calendar>
</template>

<script>
import moment from 'moment'
import { dom } from 'quasar'
const { height } = dom

export default {
  name: 'Calendar',
  data () {
    return {
      selectedDate: '',
      intervalHeight: '50px'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.intervalHeight = ((height(this.$parent.$el) - 67) / 14) + 'px'
    })
  },
  methods: {
    events (date) {
      let busyRow = []

      const tasks = this.$store.getters['tasks/filter']()
      let events = []
      tasks.forEach(t => {
        if (t.time_shifts !== undefined) {
          t.time_shifts.forEach(s => {
            if (moment(s.start).format('YYYY-MM-DD') === date) {
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
        }
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
    }
  },
  components: {
    CalendarEvent: () => import('./CalendarEvent')
  }
}
</script>
