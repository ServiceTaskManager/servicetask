<template>
  <div class="row justify-end">
    <q-btn
      flat round
      icon="add"
      @click="customerDialog = true" />
    <q-btn
      flat round
      icon="more_vert"
      @click="bottomSheet" />
    <customer-edit-dialog v-model="customerDialog" />
  </div>
</template>

<script>
import CustomerEditDialog from './CustomerEditDialog'
import UserPrompt from './UserPrompt'

export default {
  name: 'CustomersToolbar',
  data () {
    return {
      customerDialog: false
    }
  },
  methods: {
    assignTechnician (user) {
      let patch = {
        technician: (user || this.$user.data.id)
      }
      this.$store.dispatch('customers/patchBatch', { doc: patch, ids: this.$ui.selected })
      this.$ui.selected = []
    },
    userPrompt () {
      this.$q.dialog({
        component: UserPrompt,
        parent: this,
        text: 'Assign to'
      }).onOk(user => {
        this.assignTechnician(user)
      })
    },
    bottomSheet () {
      let actions = [
        {
          label: 'Create a customer',
          icon: 'add',
          color: 'grey',
          id: 'create'
        }
      ]
      if (this.$ui.selected.length > 0) {
        actions = actions.concat([{
          label: 'Assign a technician',
          icon: 'person_add',
          color: this.$users.meta.color,
          id: 'assign'
        }])
      }
      this.$q.bottomSheet({
        message: this.$ui.selected.length > 0 ? this.$ui.selected.length + ' selected' : null,
        actions: actions
      }).onOk(action => {
        if (action.id === 'delete') this.deleteTasks()
        else if (action.id === 'create') this.customerDialog = true
        else if (action.id === 'assign') this.userPrompt()
        else this.$q.notify({ message: action.id })
      })
    }
  },
  components: {
    CustomerEditDialog
  }
}
</script>
