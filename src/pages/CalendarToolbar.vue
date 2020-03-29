<template>
  <div class="row justify-end" v-if="QCalendar">
    <q-btn icon="calendar_today"
      flat rounded dense
      :label="'S' + displayedWeek + ' ' + this.QCalendar.lastStart"
      @click="moveToNow" />

    <q-btn icon="keyboard_arrow_left"
      flat round dense
      @click="QCalendar.prev()" />

    <q-btn icon="keyboard_arrow_right"
      flat round dense
      @click="QCalendar.next()" />
  </div>
  <div v-else>
    <span class="text-caption">Loading...</span>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'CalendarToolbar',
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    QCalendar () {
      let QCalendar
      if (this.value.$refs) {
        if (this.value.$refs.calendar) {
          if (this.value.$refs.calendar.$refs) {
            if (this.value.$refs.calendar.$refs.QCalendar) {
              QCalendar = this.value.$refs.calendar.$refs.QCalendar
            }
          }
        }
      }
      return QCalendar
    },
    displayedWeek () {
      return this.QCalendar ? moment(this.QCalendar.lastStart).format('W') : undefined
    }
  },
  methods: {
    moveToNow () {
      this.QCalendar.move(0 - (this.displayedWeek - moment().format('W')))
    }
  }
}
</script>
