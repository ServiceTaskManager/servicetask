<template>

  <div class="full-width row q-pa-sm-md justify-around">
    <q-card class="col-sm col-12">
      <q-toolbar :class="'bg-' + $models.task.meta.color" class="text-white q-mb-sm">
        <q-toolbar-title>
          <span class="text-h5 q-px-sm overflow-hidden">{{ task.title }}</span>
        </q-toolbar-title>
        <span class="text-caption" v-if="task.type">{{ task.type }}</span>
      </q-toolbar>
      <q-card-section header class="q-pa-none">

        <div class="row q-gutter-x-sm q-px-sm">
          <q-btn v-if="task.customer"
            :to="{ name: 'customer', params: { id: task.customer }}"
            rounded dense outline no-caps
            :color="$models.customer.meta.color"
            align="left"
            class="col">
            <div class="ellipsis">
              <q-icon :name="$models.customer.meta.icon"
                :color="$models.customer.meta.color" />
                {{ $customers.data[task.customer].name }}
            </div>
          </q-btn>
          <q-btn v-if="task.user"
            :to="{ name: 'user', params: { id: task.user }}"
            rounded dense outline no-caps
            :color="$models.user.meta.color"
            align="left"
            class="col">
            <div class="ellipsis">
              <q-icon :name="$models.user.meta.icon"
                :color="$models.user.meta.color" />
                {{ $users.data[task.user].name }}
            </div>
          </q-btn>
        </div>
        <div class="row q-pa-sm">
          <q-btn v-if="task.call"
              :to="{ name: 'call', params: { id: task.call }}"
              rounded dense outline no-caps
              :color="$models.call.meta.color"
              align="left"
              class="col">
              <div class="ellipsis">
                <q-icon :name="$models.call.meta.icon"
                  :color="$models.call.meta.color" />
                  {{ $calls.data[task.call].title }}
              </div>
            </q-btn>
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <shift-table :tasks="[task]" />
      </q-card-section>
    </q-card>
    <q-card class="col-sm col-12 q-ml-sm-md q-mt-sm-none q-mt-sm">
      <q-toolbar class="text-white bg-grey-3">
        <q-toolbar-title>
          <span
            class="text-h6 overflow-hidden"
            :class="'text-' + $models.task.meta.color">
            {{$t('tasks.description.title')}}
          </span>
        </q-toolbar-title>
        <q-btn @click="editDescription"
          flat dense round
          icon="edit" color="grey"
          class="float-right" />
      </q-toolbar>
      <q-card-section class="q-pa-sm">
        <q-markdown :src="task.description" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import moment from 'moment'
import EditDialog from '../components/generic/EditDialog'

export default {
  name: 'TaskPage',
  computed: {
    task () {
      return this.$tasks.data[this.$route.params.id]
    },
    totalTime () {
      const times = this.task.time_shifts.map(t => moment(t.end).diff(t.start, 'hours', true))
      const totalTime = times.length > 0 ? times.reduce((sum, val) => sum + val) : 0
      return Math.round(totalTime * 10) / 10
    },
    shifts () {
      let shifts = this.task.time_shifts || []
      return shifts.sort((a, b) => {
        if (moment(a.start).isBefore(b.start)) return -1
        else return 1
      })
    }
  },
  methods: {
    editShifts () {
      this.$q.dialog({
        component: EditDialog,
        title: this.$t('tasks.edit.shift.title'),
        parent: this,
        model: 'task',
        data: this.task,
        fields: this.$models.task.fields.filter(f => f.key === 'time_shifts')
      })
    },
    editDescription () {
      this.$q.dialog({
        component: EditDialog,
        title: this.$t('tasks.edit.description.title'),
        parent: this,
        maximized: true,
        model: 'task',
        data: this.task,
        fields: this.$models.task.fields.filter(f => f.key === 'description')
      })
    }
  },
  mounted () {
    if (this.$route.params.id) this.$store.dispatch(this.$route.meta.store + '/selectOneOnly', this.$route.params.id)
  },
  components: {
    ShiftTable: () => import('../components/task/ShiftTable')
  }
}
</script>
