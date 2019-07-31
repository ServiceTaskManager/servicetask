<template>
  <q-card
    :key="task.id">
    <q-card-section
      class="q-pa-sm text-white"
      :class="task.important ? 'bg-negative' : 'bg-grey-9'">
      <div class="text-h6 ellipsis">
        {{ task.title || 'undefined' }}
        <q-popup-edit v-model="task.title" v-if="edit" >
          <q-input v-model="task.title" label="Describe task" dense autofocus />
        </q-popup-edit>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-pa-sm row bg-grey-7">
      <select-customer
        v-model="task.customer"
        :readonly="!edit" />
      <select-engine
        v-model="task.engine"
        :readonly="!edit"
        :customer="task.customer" />
      <select-user
        v-model="task.done_by"
        :readonly="!edit" />
      <q-input
        v-model="task.desc"
        color="white"
        label="Description"
        :readonly="!edit"
        class="full-width"
        type="textarea"
        dense>
        <template v-slot:prepend>
          <q-icon name="description" color="white" />
        </template>
      </q-input>
      <q-input
        v-model="task.done_at"
        color="blue"
        label="Done on"
        :readonly="!edit"
        mask="date"
        :rules="['date']"
        class="full-width"
        dense>
        <q-popup-proxy>
          <q-date-time-picker
            v-model="task.done_at"
            today-btn
            first-day-of-week="1" />
        </q-popup-proxy>
        <template v-slot:prepend>
          <q-icon name="event" color="blue" />
        </template>
      </q-input>
    </q-card-section>

    <q-separator />

    <q-card-actions align="around" class="bg-grey-9" v-if="!edit">
      <q-btn round flat color="positive" icon="done" @click='doneTask' />
      <q-toggle
        color="negative"
        icon="warning"
        v-model="task.machine_down"
        @input="updateTask" />
      <q-btn round flat color="white" icon="edit" @click="edit = true" />
    </q-card-actions>
    <q-card-actions align="around" class="bg-white" v-else>
      <q-btn round flat color="negative" icon="cancel" @click="task.create ? deleteTask() : edit = false" />
      <q-btn round flat color="positive" icon="done" @click="updateTask()" />
    </q-card-actions>
  </q-card>
</template>

<script>
import SelectCustomer from './SelectCustomer'
import SelectEngine from './SelectEngine'
import SelectUser from './SelectUser'
import { date } from 'quasar'

export default {
  name: 'CardTask',
  props: ['task'],
  data () {
    return {
      edit: false,
      date: '',
      time: ''
    }
  },
  mounted () {
    this.edit = this.task.create || false

    if (this.task.done_at) {
      this.date = date.formatDate(this.task.done_at, 'YY/MM/YYYY')
      this.time = date.formatDate(this.task.done_at, 'HH:MM')
    }
  },
  methods: {
    doneTask () {
      console.log('Mark task as done ' + this.task.id)
      this.task.done_at = Date.now()
      this.$store.dispatch('tasks/set', this.task)
    },
    updateTask () {
      console.log('Update task ' + this.task.id)
      this.task.done_at = this.doneAt
      this.task.create = false
      this.$store.dispatch('tasks/set', this.task)
      this.edit = false
    },
    toggleMachineDown () {
      this.task.machine_down = !this.task.machine_down
      this.updateTask()
    }
  },
  components: {
    SelectCustomer,
    SelectEngine,
    SelectUser
  }
}
</script>
