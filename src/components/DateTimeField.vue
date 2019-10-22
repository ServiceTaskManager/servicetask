<template>
  <q-input
    v-bind="$attrs"
    v-on="$listeners"
    color="black"
    class="full-width"
    @click="openDialog"
    :value="displayValue"
    mask="datetime"
    readonly>
    <template v-slot:prepend>
      <q-icon flat round name="event" />
    </template>

    <q-dialog v-model="showDialog">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey bg-primary"
          active-color="white"
          indicator-color="white"
          align="justify"
          narrow-indicator>
          <q-tab name="date" icon="event" label="Date" />
          <q-tab name="time" icon="access_time" label="Time" />
        </q-tabs>
        <q-tab-panels v-model="tab" animated class="bg-primary">
          <q-tab-panel name="date" class="q-pa-none">
            <q-date v-model="date" mask="YYYY/MM/DD" @input="inputDate" />
          </q-tab-panel>
          <q-tab-panel name="time" class="q-pa-none">
            <q-time v-model="time" mask="HH:mm" format24h @input="inputTime" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-dialog>
  </q-input>
</template>

<script>
import moment from 'moment'

export default {
  name: 'DateTimeField',
  props: {
    value: {
      type: Date,
      default: () => {
        return new Date()
      }
    }
  },
  data () {
    return {
      tab: 'date',
      date: '',
      time: '',
      showDialog: false
    }
  },
  mounted () {
    this.$emit('input', this.dateFormatted)
  },
  watch: {
    value: function (val) {
      if (typeof val === 'object') {
        let dateTime = moment(val.toISOString())
        this.date = dateTime.format('YYYY/MM/DD')
        this.time = dateTime.format('HH:mm')
      }
    }
  },
  computed: {
    dateFormatted () {
      if (this.date.split('/').length === 3) {
        let dateArray = this.date.split('/')
        let timeArray = this.time.split(':')
        let dateTimeArray = timeArray.length === 2 ? dateArray.concat(timeArray) : dateArray.concat(['00', '00'])
        let date = new Date(dateTimeArray[0], parseInt(dateTimeArray[1]) - 1, dateTimeArray[2], dateTimeArray[3], dateTimeArray[4])
        return date
      } else {
        return new Date()
      }
    },
    displayValue () {
      return this.date + ' ' + this.time
    }
  },
  methods: {
    openDialog () {
      this.showDialog = true
      this.tab = 'date'
    },
    inputDate (event) {
      this.$emit('input', this.dateFormatted)
      this.tab = 'time'
    },
    inputTime (event) {
      this.$emit('input', this.dateFormatted)
      this.tab = 'date'
      this.showDialog = false
    }
  }
}
</script>
