<template>
  <div class="row full-width">
    <div class="col-4">
      <q-select v-model="shift.period"
        :options="periodOptions" label="Period">

        <template v-slot:prepend>
          <q-icon flat round name="event" />
        </template>
      </q-select>

      <q-input v-if="shift.period === 'custom'"
        type="number"
        suffix="h"
        :value="shiftDuration">

        <template v-slot:prepend>
          <q-btn round flat dense
            icon="remove"
            :disable="shiftDuration < 2"
            @click="adjustTime(true)" />
        </template>

        <template v-slot:append>
          <q-btn round flat dense
            icon="add"
            @click="adjustTime()" />
        </template>
      </q-input>
    </div>

    <div class="col-7">
      <q-datetime-picker v-if="shift.period !== 'custom'"
        v-model="shift.start"
        target="self"
        mode="date"
        class="full-width"
        label="Date"
        today-btn now-btn
        first-day-of-week="1"
        :display-value="startDateFormatted" />

      <div v-else>
        <q-datetime-picker
          target="self"
          mode="datetime"
          class="full-width"
          label="Start on"
          today-btn now-btn
          v-model="shift.start" format24h
          first-day-of-week="1"
          :display-value="startDateTimeFormatted" />

        <q-datetime-picker
          target="self"
          mode="datetime"
          class="full-width"
          label="End on"
          today-btn now-btn
          first-day-of-week="1"
          v-model="shift.end" format24h
          :display-value="endDateTimeFormatted" />
      </div>
    </div>

    <div class="col-1 q-mt-sm">
      <q-btn dense flat round
        icon="delete" color="negative"
        @click="deleteShift()" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'ShiftField',
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          period: 'day', // day, morning, afternoon, custom
          start: moment().format('YYYY-MM-DDTHH:mm'),
          end: moment().add(1, 'h').format('YYYY-MM-DDTHH:mm')
        }
      }
    }
  },
  data () {
    return {
      shift: this.value,
      periodOptions: ['day', 'morning', 'afternoon', 'custom']
    }
  },
  computed: {
    startDateFormatted () {
      return moment(this.shift.start).format('DD/MM/YYYY')
    },
    startDateTimeFormatted () {
      return moment(this.shift.start).format('DD/MM/YYYY HH:mm')
    },
    endDateTimeFormatted () {
      return moment(this.shift.end).format('DD/MM/YYYY HH:mm')
    },
    shiftDuration () {
      return moment(this.shift.end).diff(this.shift.start, 'hours')
    }
  },
  methods: {
    deleteShift () {
      this.$emit('delete')
    },
    adjustTime (subtract = false) {
      let newTime = subtract ? moment(this.shift.end).subtract(1, 'h') : moment(this.shift.end).add(1, 'h')
      this.shift.end = newTime.format('YYYY-MM-DDTHH:mm')
    }
  },
  watch: {
    'shift.period' (period) {
      const timeOffset = {
        day: { start: 8, end: 18 },
        morning: { start: 8, end: 12 },
        afternoon: { start: 13, end: 18 }
      }

      if (period !== 'custom') {
        this.shift.start = moment(this.shift.start).startOf('day').add(timeOffset[period].start, 'h').format('YYYY-MM-DDTHH:mm')
        this.shift.end = moment(this.shift.start).startOf('day').add(timeOffset[period].end, 'h').format('YYYY-MM-DDTHH:mm')
      }
    },
    'shift.start' (start) {
      if (moment(this.shift.end).isBefore(moment(start))) this.shift.end = moment(start).add(1, 'h').format('YYYY-MM-DDTHH:mm')
    },
    shift (val) {
      this.$emit('input', val)
    }
  }
}
</script>
