<template>
  <div class="row justify-end">
    <q-btn
      flat round
      icon="edit"
      @click="callDialog = true" />
    <q-btn v-if="call.phone"
      flat round
      icon="phone"
      type="a"
      :href="'tel:' + call.phone" />
    <q-btn
      flat round
      icon="more_vert"
      @click="bottomSheet" />

    <call-edit-dialog v-model="callDialog" :call="call">Edit call</call-edit-dialog>

    <task-edit-dialog
      :fields="{ description: { label: 'Work order name' } }"
      :task="{ customer: call.customer, engine: call.engine, title: 'Create WO', description: call.title }"
      v-model="createWOTask"
      @submit="createTask = true">
      <template v-slot:default>Ask a Work Order</template>
    </task-edit-dialog>
  </div>
</template>

<script>
import CallEditDialog from './CallEditDialog'
import TaskEditDialog from './TaskEditDialog'

export default {
  name: 'CallToolbar',
  data () {
    return {
      callDialog: false,
      createWOTask: false
    }
  },
  computed: {
    call () {
      return this.$calls.data[this.$route.params.id]
    }
  },
  methods: {
    bottomSheet () {
      this.$q.bottomSheet({
        actions: this.$store.getters['calls/getActions'](this.call.id)
      }).onOk(action => {
        let payload = {}
        if (action.patch) {
          payload = {
            doc: action.patch,
            ids: [this.call.id]
          }
          this.$store.dispatch('calls/patchBatch', payload)
        } else if (action.action) {
          payload = {
            parent: this,
            ids: [this.call.id]
          }
          this.$store.dispatch('calls/' + action.action, payload)
        }
      })
    }
  },
  components: {
    CallEditDialog,
    TaskEditDialog
  }
}
</script>
