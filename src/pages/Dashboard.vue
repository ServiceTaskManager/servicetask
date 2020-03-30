<template>
  <div class="full-width row q-pa-md-md justify-around">
    <q-card class="col-md-auto col-12">
      <q-card-section>
        <span class="text-h4">Quick actions</span><br/>
        <span class="text-caption">See on going actions or access to main ServiceTask features</span>
      </q-card-section>

      <q-card-section class="q-pa-none row justify-around">
        <q-btn
          :icon="$models.call.meta.icon"
          :color="$models.call.meta.color"
          label="New call !"
          size="50" stack flat
          @click="createCallDialog()" />
        <q-btn
          icon="directions_walk"
          color="black"
          label="Start a trip"
          size="50"
          stack flat />
        <q-btn
          :icon="$models.task.meta.icon"
          :color="$models.task.meta.color"
          label="New task"
          size="50"
          stack flat
          @click="createTaskDialog()" />
      </q-card-section>

      <q-card-section
        class="q-pa-sm bg-orange-1">
        <span class="text-h6">Customer's calls ...</span>
        <st-list model="call" :filters="callsFilters" no-select hide-filters>
          <template #item-right="{ data }">
            <div class="row">
              <q-btn dense round flat
                color="orange"
                icon="edit"
                @click="createCallDialog(data)"  />
              <q-btn dense unelevated
                color="orange-2"
                text-color="orange"
                icon="call"
                label="Call!"
                class="self-end"
                type="a"
                :href="'tel:' + data.phone" />
            </div>
          </template>
          <template #item="{ data }">
            Called {{ data.created_at | moment('from') }}
          </template>
        </st-list>
      </q-card-section>

      <q-card-section v-if="currentShifts.length > 0"
        class="q-pa-sm bg-light-blue-1">
        <span class="text-h6">On going ...</span>
        <st-list :data="currentShifts" model="task" no-select no-filters>
          <template #item-right="{ data }">
            <div class="row">
              <q-btn dense round flat
                color="light-blue"
                icon="edit"
                @click.prevent="createTaskDialog(data)" />
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
        </st-list>
      </q-card-section>

      <q-card-section v-if="!$q.platform.is.mobile">
        <stat-chart />
      </q-card-section>
    </q-card>

    <q-card class="col-md-grow col-12 q-ml-md-md q-mt-md-none q-mt-md">
      <q-card-section class="q-pb-none">
        <span class="text-h4">Future overview</span><br/>
        <span class="text-caption">See what is coming for next days, and re-schedule if needed</span>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <calendar @task-click="$router.push({ name: 'task', params: { id: $event.id } })"></calendar>
      </q-card-section>
    </q-card>
  </div>
</template>

<style>
.q-current-day {
  background-color: #eee;
}
</style>

<script>
import moment from 'moment'
import EditDialog from '../components/generic/EditDialog'

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
      const tasks = this.$store.getters['tasks/filter']([['technician', '==', this.$user.id]])
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
    },
    createTaskDialog (task = {}) {
      this.$q.dialog({
        component: EditDialog,
        parent: this,
        title: 'Create a task',
        model: 'task',
        data: task
      })
    },
    createCallDialog (call = {}) {
      this.$q.dialog({
        component: EditDialog,
        parent: this,
        title: 'Create a task',
        model: 'call',
        data: call
      })
    }
  },
  components: {
    StList: () => import('../components/generic/StList'),
    Calendar: () => import('../components/generic/Calendar'),
    StatChart: () => import('../components/generic/StatChart')
  }
}
</script>
