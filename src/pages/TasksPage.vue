<template>
  <div>
    <div class="full-width row q-pa-sm-md justify-around">
      <q-card class="col-sm col-12">
        <q-card-section class="full-width">
          <span class="text-h6">{{$t('tasks.user.title')}}</span>
          <q-btn class="float-right" flat round color="light-blue" icon="add"
            @click="taskDialog(undefined)" />
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-none bg-light-blue-1" v-if="currentShifts.length > 0">
          <st-list :data="currentShifts" model="task" no-select no-filters class="q-px-sm">
            <template #first>
              <q-item class="q-pa-none">
                <q-item-label header>On going tasks</q-item-label>
              </q-item>
            </template>
            <template #item-right="{ data }">
              <div class="row">
                <q-btn dense round flat
                  color="light-blue"
                  icon="edit"
                  @click.prevent="taskDialog(data)" />
                <q-btn dense unelevated
                  color="light-blue-2"
                  text-color="light-blue"
                  icon="keyboard_arrow_right"
                  label="Finish!"
                  class="self-end"
                  @click.prevent="endShift(data)" />
              </div>
            </template>
            <template #item="{ data }">
              Started {{ getCurrentShift(data).start | moment('from') }}
            </template>
          </st-list>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-none bg-light-blue-1" v-if="upcomingShifts.length > 0">
          <st-list :data="upcomingShifts" model="task" no-select no-filters class="q-px-sm">
            <template #first>
              <q-item class="q-pa-none">
                <q-item-label header>Up coming tasks</q-item-label>
              </q-item>
            </template>
            <template #item-right="{ data }">
              <div class="row">
                <q-btn dense round flat
                  color="light-blue"
                  icon="edit"
                  @click.prevent="taskDialog(data)" />
                <q-btn dense unelevated
                  color="light-blue-2"
                  text-color="light-blue"
                  icon="keyboard_arrow_right"
                  label="Finish!"
                  class="self-end" />
              </div>
            </template>
            <template #item="{ data }">
              Start {{ getFutureShift(data).start | moment('from') }}
            </template>
          </st-list>
        </q-card-section>
        <q-card-section>
          <st-list model="task"
            :filters="[['user', '==', $user.data.id]]"
            :fields="$models.task.fields.filter(f => f.key !== 'user')" />
        </q-card-section>
      </q-card>
      <q-card class="col-sm col-12 q-ml-sm-md q-mt-sm-none q-mt-sm">
        <q-card-section>
          <span class="text-h6">{{$t('tasks.all.title')}}</span>
        </q-card-section>
        <q-card-section>
          <st-list model="task" />
        </q-card-section>
      </q-card>
    </div>
    <div class="full-width row q-pa-sm-md justify-around">

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
