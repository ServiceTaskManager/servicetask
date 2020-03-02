<template>
  <div>
    <q-btn v-if="$ui.selected.length > 0 && $q.platform.is.desktop"
      flat round
      icon="delete"
      @click="deleteTasks" />
    <q-btn v-if="$ui.selected.length > 0 && $q.platform.is.desktop"
      flat round
      icon="person_add"
      @click="userPrompt" />
    <q-btn
      flat round
      icon="add"
      @click="taskDialog = true" />
    <q-btn
      flat round
      icon="more_vert"
      @click="bottomSheet" />

    <task-edit-dialog v-model="taskDialog" />
    <task-edit-dialog v-model="assignTaskDialog" :fields="{ user: {} }" />
  </div>
</template>

<script>
import TaskEditDialog from './TaskEditDialog'
import UserPrompt from './UserPrompt'

export default {
  name: 'TasksToolbar',
  data () {
    return {
      taskDialog: false,
      assignTaskDialog: false
    }
  },
  methods: {
    deleteTasks () {
      this.$q.dialog({
        title: 'Delete',
        message: 'Delete ' + this.$ui.selected.length + ' task(s) ?',
        color: 'negative',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.dispatch('tasks/deleteBatch', this.$ui.selected)
        this.$ui.selected = []
      })
    },
    assignTasks (user) {
      console.log(user)
      let patch = {
        user: (user || this.$user.data.id)
      }
      this.$store.dispatch('tasks/patchBatch', { doc: patch, ids: this.$ui.selected })
      this.$ui.selected = []
    },
    userPrompt () {
      this.$q.dialog({
        component: UserPrompt,
        parent: this,
        text: 'Assign to'
      }).onOk(user => {
        this.assignTasks(user)
      })
    },
    bottomSheet () {
      let actions = [
        {
          label: 'Create a task',
          icon: 'add',
          color: 'grey',
          id: 'create'
        }
      ]
      if (this.$ui.selected.length > 0) {
        actions = actions.concat([{
          label: 'Delete',
          icon: 'delete',
          color: 'negative',
          id: 'delete'
        }, {
          label: 'Assign',
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
        else if (action.id === 'create') this.taskDialog = true
        else if (action.id === 'assign') this.userPrompt()
        else this.$q.notify({ message: action.id })
      })
    }
  },
  components: {
    TaskEditDialog
  }
}
</script>
