<template>
  <div class="full-width row justify-around">
    <q-card class="col-auto q-ma-md">
      <q-card-section>
        <span class="text-h4">Quick actions</span><br/>
        <span class="text-caption">See on going actions or access to main ServiceTask features</span>
      </q-card-section>

      <q-card-section class="q-pa-none row justify-around">
        <q-btn :icon="$calls.meta.icon" :color="$calls.meta.color" label="New call !" size="50" stack flat />
        <q-btn icon="directions_walk" color="black" label="Start a trip" size="50" stack flat />
      </q-card-section>

      <q-card-section
        class="q-pa-sm bg-orange-1">
        <span class="text-h6">Customer's calls ...</span>
        <store-list store="calls" :filters="callsFilters" no-select hide-filters>
          <template #item-right="{ data }">
            <div class="row">
              <q-btn dense round flat
                color="orange"
                icon="edit" />
              <q-btn dense unelevated
                color="orange-2"
                text-color="orange"
                icon="keyboard_arrow_right"
                label="Finish!"
                class="self-end" />
            </div>
          </template>
          <template #item="{ data }">
            Started {{ data.created_at.start | moment('from') }}
          </template>
        </store-list>
      </q-card-section>

      <q-card-section v-if="currentShifts.length > 0"
        class="q-pa-sm bg-light-blue-1">
        <span class="text-h6">On going ...</span>
        <store-list :data="currentShifts" store="tasks" no-select hide-filters>
          <template #item-right="{ data }">
            <div class="row">
              <q-btn dense round flat
                color="light-blue"
                icon="edit" />
              <q-btn dense unelevated
                color="light-blue-2"
                text-color="light-blue"
                icon="keyboard_arrow_right"
                label="Finish!"
                class="self-end" />
            </div>
          </template>
          <template #item="{ data }">
            Started {{ getCurrentShift(data).start | moment('from') }}
          </template>
        </store-list>
      </q-card-section>
    </q-card>

    <q-card class="col-grow q-ma-md">
      <q-card-section class="q-pb-none">
        <span class="text-h4">Future overview</span><br/>
        <span class="text-caption">See what is coming for next days, and re-schedule if needed</span>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <calendar></calendar>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Dashboard',
  data () {
    return {
      callsFilters: [
        ['open', '==', true]
      ]
    }
  },
  computed: {
    currentShifts () {
      const tasks = this.$store.getters['tasks/filter']([['technician', '==', this.$user.data.id]])
      return tasks.filter(t => {
        let keep = false
        if (t.time_shifts) {
          t.time_shifts.forEach(s => {
            if (moment(new Date()).isBetween(moment(s.start), moment(s.end))) keep = true
          })
        }
        return keep
      })
    }
  },
  methods: {
    getCurrentShift (task) {
      return task.time_shifts.filter(s => moment(new Date()).isBetween(moment(s.start), moment(s.end)))[0]
    }
  },
  components: {
    StoreList: () => import('../components/generic/StoreList'),
    Calendar: () => import('./Calendar')
  }
}
</script>
