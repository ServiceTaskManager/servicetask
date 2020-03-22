<template>
  <div>
    <shift-field v-for="(shift, key) in shifts"
      v-model="shifts[key]"
      :key="key"
      @delete="deleteShift(shift)" />

    <q-input
      color="black"
      class="full-width"
      @click="addShift()"
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
  name: 'ShiftsField',
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
      shifts: this.value
    }
  },
  methods: {
    addShift () {
      this.shifts.push({
        period: 'custom', // day, morning, afternoon, custom
        start: moment().format('YYYY-MM-DDTHH:mm'),
        end: moment().add(1, 'h').format('YYYY-MM-DDTHH:mm')
      })
    },
    deleteShift (shift) {
      this.shifts = this.shifts.filter(s => s !== shift)
    }
  },
  watch: {
    shifts (val) {
      this.$emit('input', val)
    }
  },
  components: {
    ShiftField: () => import('./ShiftField')
  }
}
</script>
