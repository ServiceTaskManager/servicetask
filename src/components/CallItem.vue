<template>
  <div>
    <q-separator />
    <q-item :class="light ? 'q-pa-xs' : null">
      <q-item-section avatar top class="q-gutter-sm">
        <user-avatar :user-id="call.assign_to" />
        <span v-if="call.status === 'new'"
          caption
          class="text-grey-6 text-center full-width">
          {{ timeAgo }} h
        </span>
        <q-btn v-if="call.status === 'assigned'"
          round
          icon="chevron_left"
          color="grey"
          @click="unassign" />
        <q-btn v-if="call.status === 'closed'"
          round
          icon="chevron_left"
          color="grey"
          @click="assign" />
      </q-item-section>

      <q-item-section top>
        <title-chip :dense="light" :title="call.title" />
        <engine-chip :dense="light" :engine-id="call.engine" />
        <customer-chip :dense="light" :customer-id="call.customer" />
        <phone-chip :dense="light" clickable :phone="call.phone" :person="call.person" @click="callAssignDialog = true" />
      </q-item-section>

      <q-item-section side top class="q-gutter-sm">
        <q-btn v-if="call.status === 'unassigned'"
          round
          icon="phone"
          color="green"
          @click="confirmCall = true" />
        <q-btn v-if="call.status === 'assigned'"
          round
          icon="chevron_right"
          color="blue"
          @click="createWOTask = true" />
        <q-btn v-if="call.status === 'assigned'"
          round flat
          icon="close"
          color="grey"
          @click="close" />
        <q-btn round flat
          icon="edit"
          color="grey"
          :to="{ name: 'callsEdit', params: { id: call.id }}" />
        <q-btn round flat
          icon="delete"
          color="negative"
          @click="deleteCall" />
      </q-item-section>
    </q-item>
    <call-assign-dialog :call="call" v-model="confirmCall" />
    <task-create-dialog
      preset="createWO"
      :fields="{ description: { label: 'Work order name' } }"
      :overwrite="{ customer: call.customer, engine: call.engine, description: call.title }"
      v-model="createWOTask"
      @submit="createTask = true">
      Ask a Work Order
    </task-create-dialog>
    <task-create-dialog
      :fields="{ description: { label: undefined }, title: { label: undefined } }"
      :overwrite="{ customer: call.customer, engine: call.engine, title: 'Fix ' + call.title }"
      v-model="createTask"
      @submit="closeCall = true">
      Create a new task
    </task-create-dialog>
    <call-close-dialog :call="call" v-model="closeCall" />
  </div>
</template>

<script>
import { date } from 'quasar'
import UserAvatar from './UserAvatar'
import CallAssignDialog from './CallAssignDialog'
import TaskCreateDialog from './TaskCreateDialog'
import CallCloseDialog from './CallCloseDialog'
import TitleChip from './TitleChip'
import EngineChip from './EngineChip'
import CustomerChip from './CustomerChip'
import PhoneChip from './PhoneChip'

export default {
  name: 'CallItem',
  props: {
    call: {
      type: Object,
      default: () => {
        return this.$store.state.calls.default
      }
    },
    light: Boolean
  },
  data () {
    return {
      confirmCall: false,
      createWOTask: false,
      createTask: false,
      closeCall: false
    }
  },
  computed: {
    timeAgo () {
      return date.getDateDiff(new Date(), this.call.created_at, 'hours')
    }
  },
  methods: {
    close () {
      this.call.status = 'closed'
      this.$store.dispatch('calls/patch', this.call)
    },
    unassign () {
      this.call.status = 'unassigned'
      this.call.assign_to = ''
      this.$store.dispatch('calls/patch', this.call)
    },
    assign () {
      this.call.status = 'assigned'
      this.$store.dispatch('calls/patch', this.call)
    },
    deleteCall () {
      this.$store.dispatch('calls/delete', this.call.id)
    }
  },
  components: {
    UserAvatar,
    CallAssignDialog,
    TaskCreateDialog,
    CallCloseDialog,
    TitleChip,
    EngineChip,
    CustomerChip,
    PhoneChip
  }
}
</script>
