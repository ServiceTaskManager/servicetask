<template>
  <q-expansion-item>
    <template v-slot:header>
      <q-item-section avatar top class="q-gutter-sm">
        <q-btn v-if="call.status === 'unassigned'"
          round
          icon="phone"
          color="green"
          @click="confirmCall = true" />
        <user-avatar v-else :user-id="call.assign_to" />
        <span v-if="call.status === 'unassigned'"
          caption
          class="text-grey-6 text-center full-width">
          {{ timeAgo }} h
        </span>
      </q-item-section>

      <q-item-section top>
        <q-item-label class="text-bold">{{ call.title }}</q-item-label>
        <q-item-label caption lines="1">
          <customer-chip :customer="customer" dense v-if="customer" />
          <engine-chip :engine="engine" dense v-if="engine" />
        </q-item-label>
      </q-item-section>
    </template>

    <q-card>
      <q-card-section>
        <customer-chip :customer="customer" class="full-width" />
        <engine-chip :engine="engine" SN class="full-width" />
        <phone-chip :phone="call.phone" :person="call.person" :clickable="call.status === 'assigned'" class="full-width" />
      </q-card-section>
      <q-card-actions align="around">
        <q-btn v-if="call.status === 'assigned'"
          flat round
          icon="chevron_left"
          color="grey"
          @click="unassign" />
        <q-btn v-if="call.status === 'closed'"
          flat round
          icon="chevron_left"
          color="grey"
          @click="assign" />
        <q-btn v-if="call.status === 'assigned'"
          round
          icon="chevron_right"
          color="blue"
          @click="createWOTask = true" />
        <q-btn v-if="call.status === 'assigned'"
          flat round
          icon="close"
          color="grey"
          @click="close" />
        <q-btn flat round
          icon="edit"
          color="grey"
          :to="{ name: 'callsEdit', params: { id: call.id }}" />
        <q-btn flat round
          icon="delete"
          color="negative"
          @click="deleteCall" />
      </q-card-actions>
    </q-card>
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
  </q-expansion-item>
</template>

<script>
import { date } from 'quasar'
import UserAvatar from './UserAvatar'
import CallAssignDialog from './CallAssignDialog'
import TaskCreateDialog from './TaskCreateDialog'
import CallCloseDialog from './CallCloseDialog'
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
    }
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
    },
    customer () {
      return this.$store.state.customers.data[this.call.customer]
    },
    engine () {
      return this.$store.state.engines.data[this.call.engine]
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
    EngineChip,
    CustomerChip,
    PhoneChip
  }
}
</script>
