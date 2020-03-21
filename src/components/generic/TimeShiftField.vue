<template>
  <div>
    <div class="row full-width items-start" v-for="(shift, key) in shifts" :key="key">
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
          :value="shiftDuration(shift)">

          <template v-slot:prepend>
            <q-btn round flat dense
              icon="remove"
              :disable="shiftDuration(shift) < 1"
              @click="shift.end = adjustTime(shift.end, true)" />
          </template>

          <template v-slot:append>
            <q-btn round flat dense
              icon="add"
              @click="shift.end = adjustTime(shift.end)" />
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
          :display-value="formatDate(shift.start)" />

        <div v-else>
          <q-datetime-picker
            target="self"
            mode="datetime"
            class="full-width"
            label="Start on"
            v-model="shift.start" format24h
            :display-value="formatDateTime(shift.start)" />

          <q-datetime-picker
            target="self"
            mode="datetime"
            class="full-width"
            label="End on"
            v-model="shift.end" format24h
            :display-value="formatDateTime(shift.end)" />
        </div>
      </div>

      <div class="col-1 q-mt-sm">
        <q-btn dense flat round
          icon="delete" color="negative"
          @click="deleteShift(shift)" />
      </div>
    </div>

    <q-input
      color="black"
      class="full-width"
      @click="addShift()"
      mask="datetime"
      readonly
      label="Click to add a shift">
      <template v-slot:prepend>
        <q-icon flat round name="event" />
      </template>

      <template v-slot:append>
        <q-icon flat round name="append" color="positive" />
      </template>
    </q-input>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'TimeShiftField',
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      tab: 'start',
      shifts: this.value,
      periodOptions: ['day', 'morning', 'afternoon', 'custom']
    }
  },
  methods: {
    addShift () {
      this.shifts.push({
        period: 'day', // day, morning, afternoon, custom
        start: moment().format('YYYY-MM-DDTHH:mm'),
        end: moment().add(1, 'h').format('YYYY-MM-DDTHH:mm')
      })
    },
    deleteShift (shift) {
      this.shifts = this.shifts.filter(s => s !== shift)
    },
    shiftDuration (shift) {
      return moment(shift.end).diff(shift.start, 'hours')
    },
    adjustTime (time, subtract = false) {
      let newTime = subtract ? moment(time).subtract(1, 'h') : moment(time).add(1, 'h')
      return newTime.format('YYYY-MM-DDTHH:mm')
    },
    formatDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    formatDateTime (date) {
      return moment(date).format('DD/MM/YYYY HH:mm')
    }
  },
  watch: {
    shifts (val) {
      this.$emit('input', val)
    }
  }
}
</script>
