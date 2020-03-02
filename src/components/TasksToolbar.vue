<template>
  <div class="row justify-end">
    <q-btn
      flat round
      icon="add"
      @click="taskDialog = true" />
    <q-btn
      flat round
      icon="more_vert"
      @click="bottomSheet" />

    <task-edit-dialog v-model="taskDialog" />
  </div>
</template>

<script>
import TaskEditDialog from './TaskEditDialog'

export default {
  name: 'TasksToolbar',
  data () {
    return {
      taskDialog: false,
      createWOTask: false
    }
  },
  computed: {
    actions () {
      return this.$store.getters['tasks/getActions']()
    }
  },
  methods: {
    bottomSheet () {
      this.$q.bottomSheet({
        message: this.$ui.selected.length > 0 ? this.$ui.selected.length + ' selected' : null,
        actions: this.actions
      }).onOk(action => {
        let payload = {}
        if (action.patch) {
          payload = {
            doc: action.patch,
            ids: this.$ui.selected
          }
          this.$store.dispatch('tasks/patchBatch', payload)
        } else if (action.action) {
          payload = {
            parent: this,
            ids: this.$ui.selected
          }
          this.$store.dispatch('tasks/' + action.action, payload)
        }
        this.$ui.selected = []
      })
    }
  },
  components: {
    TaskEditDialog
  }
}
</script>
