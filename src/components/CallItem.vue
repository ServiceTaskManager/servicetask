<template>
  <div>
    <q-item>
      <q-item-section avatar top class="gt-xs">
        <q-circular-progress
          show-value
          class="q-ma-sm"
          v-model="timeAgo.daysRatio"
          size="60px"
          :thickness="0.2"
          color="red"
          center-color="grey-3"
          track-color="red-3">
          <q-circular-progress
            show-value
            v-model="timeAgo.hoursRatio"
            size="50px"
            :thickness="0.2"
            :color="timeAgo.daysRatio > 0 ? 'red' : 'orange'"
            :center-color="timeAgo.daysRatio > 0 ? 'red' : 'orange'"
            :track-color="timeAgo.daysRatio > 0 ? 'red-3' : 'orange-3'">
            <q-circular-progress
              show-value
              v-model="timeAgo.minutesRatio"
              size="40px"
              :thickness="0.2"
              :color="timeAgo.hoursRatio > 0 ? 'orange' : 'green'"
              :center-color="timeAgo.hoursRatio > 0 ? 'orange' : 'green'"
              :track-color="timeAgo.hoursRatio > 0 ? 'orange-3' : 'green-3'">
              <span class="text-bold">{{ timeAgo.display }}</span>
            </q-circular-progress>
          </q-circular-progress>
        </q-circular-progress>
      </q-item-section>

      <q-item-section top>
        <q-item-label lines="1">
          <span class="text-h5">{{ call.title }}</span>
          <span caption class="text-grey-6 float-right">{{ timeAgo.display }}</span>
        </q-item-label>
        <q-item-label>
          <span class="text-grey-9">
            <q-icon name="print" color="teal" /> {{ engine.type }}
            <q-badge color="teal" class="q-mr-sm">SN/{{ engine.sn }}</q-badge>
            <q-btn dense rounded
              class="q-px-sm"
              size="xs"
              @click="toggleEngineDown"
              :color="engine.down ? 'negative' : 'positive'"
              :label="engine.down ? 'DOWN' : 'UP'" />
          </span>
        </q-item-label>
        <q-item-label>
          <q-icon name="people" color="pink" /> <span class="text-grey-8"> {{ customer.name }}</span>
          <q-icon name="person" color="green" /> <span class="text-grey-8"> {{ call.person }}</span>
        </q-item-label>
        <q-item-label
          lines="1"
          class="text-grey-8 q-gutter-xs row">
          <q-btn flat dense round icon="edit" :to="{ name: 'callsEdit', params: { id: call.id } }" />
          <q-btn flat dense round icon="remove_circle" color="negative" @click="deleteCall(call.id)" />
          <q-btn flat dense round
            class="lt-sm"
            icon="phone"
            color="positive"
            @click="assignCall" />
        </q-item-label>
      </q-item-section>

      <q-item-section class="gt-xs" avatar top>
        <q-btn flat dense round
          size="30px"
          icon="phone"
          color="positive"
          @click="assignCall" />
      </q-item-section>
    </q-item>
    <q-separator />
  </div>
</template>

<script>
import { date, openURL } from 'quasar'

export default {
  name: 'CallItem',
  props: ['call'],
  data () {
    return {
      engine: {
        type: '',
        down: false
      },
      customer: {
        name: ''
      }
    }
  },
  computed: {
    timeAgo () {
      let now = new Date()
      let displayUnit = 'minutes'
      let diffMinutes = date.getDateDiff(now, this.call.created_at, 'minutes')
      if (diffMinutes > 60) displayUnit = 'hours'
      else if (diffMinutes > 60 * 24) displayUnit = 'days'
      return {
        minutes: parseInt(diffMinutes),
        minutesRatio: parseInt(diffMinutes) % 60 / 60 * 100,
        hours: parseInt(date.getDateDiff(now, this.call.created_at, 'hours')),
        hoursRatio: parseInt(date.getDateDiff(now, this.call.created_at, 'hours')) % 24 / 24 * 100,
        days: parseInt(date.getDateDiff(now, this.call.created_at, 'days')),
        daysRatio: parseInt(date.getDateDiff(now, this.call.created_at, 'days')) % 5 / 5 * 100,
        display: date.getDateDiff(now, this.call.created_at, displayUnit) + ' ' + displayUnit.slice(0, 1)
      }
    }
  },
  mounted () {
    this.engine = this.$store.state.engines.data[this.call.engine]
    this.customer = this.$store.state.customers.data[this.call.customer]
  },
  methods: {
    deleteCall () {
      this.$store.dispatch('calls/delete', this.call.id).then(r => {
        this.$q.notify({
          message: 'Call deleted',
          color: 'positive',
          icon: 'remove_circle'
        })
      })
    },
    assignCall () {
      console.log('Assign call')
      this.call.status = 'assigned'
      this.call.assign_to = this.$store.state.user.data.id
      this.$store.dispatch('calls/patch', this.call)
      openURL('tel:' + this.call.phone)
    },
    toggleEngineDown () {
      console.log('toggle')
      this.engine.down = !this.engine.down
    }
  }
}
</script>
