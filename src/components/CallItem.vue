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
          @click="callAssignDialog = true" />
        <q-btn v-if="call.status === 'assigned'"
          round
          icon="chevron_right"
          color="blue"
          @click="taskCreateDialog = true" />
        <q-btn
          round flat
          icon="edit"
          color="grey"
          :to="{ name: 'callsEdit', params: { id: call.id } }" />
      </q-item-section>
    </q-item>
    <call-assign-dialog :call="call" v-model="callAssignDialog" />
    <task-create-dialog
      preset="createWO"
      :fields="{ description: { label: 'Work order name' } }"
      :overwrite="{ customer: call.customer, engine: call.engine }"
      v-model="taskCreateDialog">
      Ask a Work Order
    </task-create-dialog>
  </div>
</template>

<script>
import { date } from 'quasar'
import UserAvatar from './UserAvatar'
import CallAssignDialog from './CallAssignDialog'
import TaskCreateDialog from './TaskCreateDialog'
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
      callAssignDialog: false,
      taskCreateDialog: false
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
    }
  },
  components: {
    UserAvatar,
    CallAssignDialog,
    TaskCreateDialog,
    TitleChip,
    EngineChip,
    CustomerChip,
    PhoneChip
  }
}
</script>
