<template>
  <div class="full-width row q-pa-md-md justify-around">
    <div class="col-md-auto col-12">
      <q-card>
        <q-toolbar class="bg-black text-white">
          <q-toolbar-title>
            <span class="text-h5 q-px-sm overflow-hidden">{{$t('dashboard.quickactions.title')}}</span>
          </q-toolbar-title>
        </q-toolbar>

        <q-card-section class="q-pa-none row justify-around bg-grey-2">
          <q-btn
            :icon="$models.call.meta.icon"
            :color="$models.call.meta.color"
            :label="$t('dashboard.newcall')"
            size="50" stack flat
            @click="createCallDialog()" />
          <q-btn
            icon="directions_walk"
            color="black"
            :label="$t('dashboard.starttrip')"
            size="50"
            stack flat />
          <q-btn
            :icon="$models.task.meta.icon"
            :color="$models.task.meta.color"
            :label="$t('dashboard.newtask')"
            size="50"
            stack flat
            @click="createTaskDialog()" />
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-none">
          <st-list model="call"
            :filters="[['open', '==', true], ['technician', 'unassigned', '']]"
            no-select hide-filters>
            <template #first>
              <q-item class="q-pa-none">
                <q-item-label header :class="'text-' + $models.call.meta.color">
                  {{$t('dashboard.openunassigned.title')}}
                </q-item-label>
              </q-item>
            </template>
            <template #item-right="{ data }">
              <q-btn @click="prevent($event)"
                :href="'tel:' + data.phone"
                round flat dense unelevated
                color="orange"
                icon="call"
                class="self-end"
                type="a" />
            </template>
          </st-list>
        </q-card-section>

        <q-card-section v-if="currentShifts.length > 0"
          class="q-pa-none">
          <span class="text-h6"></span>
          <st-list :data="currentShifts" model="task" no-select no-filters>
            <template #first>
              <q-item class="q-pa-none">
                <q-item-label header :class="'text-' + $models.task.meta.color">
                  {{$t('dashboard.currentshifts.title')}}
                </q-item-label>
              </q-item>
            </template>
            <template #item-right="{ data }">
              <q-btn dense unelevated
                color="light-blue-2"
                text-color="light-blue"
                icon="keyboard_arrow_right"
                label="Finish!"
                class="self-end" />
            </template>
          </st-list>
        </q-card-section>
      </q-card>

      <q-card class="q-mt-md" v-if="!$q.platform.is.mobile">
        <q-toolbar class="bg-black text-white">
          <q-toolbar-title>
            <span class="text-h5 q-px-sm overflow-hidden">{{$t('dashboard.chart.title')}}</span>
          </q-toolbar-title>
        </q-toolbar>
        <q-card-section>
          <stat-chart style="height: 300px" />
        </q-card-section>
      </q-card>
    </div>

    <q-card class="col col-md-grow col-12 q-ml-md-md q-mt-md-none q-mt-md">
      <q-toolbar class="bg-black text-white">
        <q-toolbar-title>
          <span class="text-h5 q-px-sm overflow-hidden">{{$t('dashboard.calendar.title')}}</span>
        </q-toolbar-title>
      </q-toolbar>

      <q-card-section class="q-pa-none" stretch>
        <calendar @task-click="$router.push({ name: 'task', params: { id: $event.id } })"/>
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
    prevent (e) {
      e.stopPropagation()
    },
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
