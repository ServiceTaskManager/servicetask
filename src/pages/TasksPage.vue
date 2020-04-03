<template>
  <div>
    <div class="full-width row q-pa-sm-md justify-around">
      <q-card class="col-sm col-12">
        <q-toolbar class="text-white bg-grey-3">
          <q-toolbar-title>
            <span
              class="text-h6 overflow-hidden"
              :class="'text-' + $models.task.meta.color">
              {{$t('tasks.user.title')}}
            </span>
          </q-toolbar-title>
          <q-btn class="float-right" flat round :color="$models.task.meta.color" icon="add"
            @click="taskDialog(undefined)" />
        </q-toolbar>
        <q-separator />
        <q-card-section class="q-pa-none" v-if="currentShifts.length > 0">
          <st-list :data="currentShifts" model="task" no-filters>
            <template #first>
              <q-item class="q-pa-none">
                <q-item-label header
                  :class="'text-' + $models.task.meta.color">
                  {{$t('tasks.ongoing')}}
                </q-item-label>
              </q-item>
            </template>
            <template #item-right="{ data }">
              <q-btn dense unelevated
                color="light-blue-2"
                text-color="light-blue"
                icon="keyboard_arrow_right"
                label="Finish!"
                class="self-end"
                @click.prevent="endShift(data)" />
            </template>
          </st-list>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-none bg-light-blue-1" v-if="upcomingShifts.length > 0">
          <st-list :data="upcomingShifts" model="task" no-select no-filters class="q-px-sm">
            <template #first>
              <q-item class="q-pa-none">
                <q-item-label
                  header
                  :class="'text-' + $models.task.meta.color">{{$t('tasks.upcoming')}}</q-item-label>
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
        <q-card-section class="q-pa-none">
          <st-list model="task"
            :filters="[['user', '==', $user.data.id]]"
            :fields="$models.task.fields.filter(f => f.key !== 'user')"
            no-right>
            <template #first>
              <q-item class="q-pa-none">
                <q-item-label
                  header
                  :class="'text-' + $models.task.meta.color">{{$t('tasks.mine')}}</q-item-label>
              </q-item>
            </template>
          </st-list>
        </q-card-section>
      </q-card>
      <q-card class="col-sm col-12 q-ml-sm-md q-mt-sm-none q-mt-sm">
        <q-toolbar class="text-white bg-grey-3">
          <q-toolbar-title>
            <span
              class="text-h6 overflow-hidden"
              :class="'text-' + $models.task.meta.color">
              {{$t('tasks.all.title')}}
            </span>
          </q-toolbar-title>
        </q-toolbar>
        <q-card-section class="q-pa-none">
          <st-list model="task" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import EditDialog from '../components/generic/EditDialog'

export default {
  name: 'TaskPage',
  components: {
    StList: () => import ('../components/generic/StList')
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
    },
    upcomingShifts () {
      const tasks = this.$store.getters['tasks/filter']([['technician', '==', this.$user.id]])
      return tasks.filter(t => {
        let keep = false
        if (t.time_shifts) {
          t.time_shifts.forEach(s => {
            const diff = 0 - moment(new Date()).diff(moment(s.start), 'm')
            if (diff < 120 && diff > 0) keep = true
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
    getFutureShift (task) {
      return task.time_shifts.filter(s => {
        const diff = 0 - moment(new Date()).diff(moment(s.start), 'm')
        console.log((diff < 120 && diff > 0))
        return (diff < 120 && diff > 0)
      })[0]
    },
    taskDialog (task = {}) {
      this.$q.dialog({
        component: EditDialog,
        parent: this,
        title: 'Create a task',
        model: 'task',
        data: task
      })
    },
    endShift (task) {
      task.time_shifts =
      task.time_shifts.reduce((acc, s) => {
        if (moment(new Date()).isBetween(moment(s.start), moment(s.end))) {
          s.end = moment().format('YYYY-MM-DDTHH:mm')
          s.period = 'custom'
        }
        return acc.concat([s])
      }, [])
      this.$store.dispatch('tasks/patch', task)
    }
  }
}
</script>
