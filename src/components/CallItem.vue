<template>
  <div>
    <q-separator />
    <q-expansion-item @show="caption = false" @hide="caption = true">
      <template v-slot:header>
        <q-item-section top>
          <q-separator />
          <q-item-label overline>{{ call.created_at.toISOString() | moment('from') }}</q-item-label>
          <q-item-label class="text-bold">{{ call.title }}</q-item-label>
          <q-item-label caption lines="1" v-if="caption">
            <customer-chip :customer-id="call.customer" dense v-if="call.customer && !hideCustomer" />
            <engine-chip :engine-id="call.engine" dense v-if="call.engine && !hideEngine" />
          </q-item-label>
        </q-item-section>
      </template>

      <q-card>
        <q-card-section>
          <user-chip :user-id="call.assign_to" class="full-width" v-if="call.assign_to" />
          <customer-chip :customer-id="call.customer" class="full-width" v-if="!hideCustomer" />
          <engine-chip :engine-id="call.engine" SN class="full-width" v-if="!hideEngine" />
          <phone-chip :phone="call.phone" :person="call.person" clickable @click="confirmCall = true" class="full-width" />
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
            @click="callEdit = true" />
          <q-btn flat round
            icon="delete"
            color="negative"
            @click="deleteCall" />
        </q-card-actions>
      </q-card>
      <call-assign-dialog :call="call" v-model="confirmCall" persistent />
      <task-edit-dialog
        preset="createWO"
        :fields="{ description: { label: 'Work order name' } }"
        :overwrite="{ customer: call.customer, engine: call.engine, description: call.title }"
        v-model="createWOTask"
        @submit="createTask = true">
        Ask a Work Order
      </task-edit-dialog>
      <task-edit-dialog
        :fields="{ description: { label: undefined }, title: { label: undefined } }"
        :overwrite="{ customer: call.customer, engine: call.engine, title: 'Fix ' + call.title }"
        v-model="createTask"
        @submit="closeCall = true">
        Create a new task
      </task-edit-dialog>
      <call-close-dialog :call="call" v-model="closeCall" />
      <call-edit-dialog v-model="callEdit" :call-id="call.id">Edit call</call-edit-dialog>
    </q-expansion-item>
  </div>
</template>

<script>
import CallAssignDialog from './CallAssignDialog'
import TaskEditDialog from './TaskEditDialog'
import CallEditDialog from './CallEditDialog'
import CallCloseDialog from './CallCloseDialog'
import UserChip from './UserChip'
import EngineChip from './EngineChip'
import CustomerChip from './CustomerChip'
import PhoneChip from './PhoneChip'

export default {
  name: 'CallItem',
  props: {
    call: {
      type: Object,
      default: () => {
        return {}
      }
    },
    hideCustomer: {
      type: Boolean,
      default: false
    },
    hideEngine: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      confirmCall: false,
      createWOTask: false,
      createTask: false,
      closeCall: false,
      callEdit: false,
      caption: true
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
    CallAssignDialog,
    TaskEditDialog,
    CallEditDialog,
    CallCloseDialog,
    UserChip,
    EngineChip,
    CustomerChip,
    PhoneChip
  }
}
</script>
