<template>
  <div class="row justify-end">
    <q-btn
      flat round
      icon="edit"
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
  name: 'TaskToolbar',
  data () {
    return {
      taskDialog: false
    }
  },
  computed: {
    task () {
      return this.$tasks.data[this.$route.params.id]
    },
    actions () {
      return this.$store.getters['tasks/getActions'](this.task.id)
    }
  },
  methods: {
    bottomSheet () {
      this.$q.bottomSheet({
        actions: this.actions
      }).onOk(action => {
        let payload = {}
        if (action.patch) {
          payload = {
            doc: action.patch,
            ids: [this.task.id]
          }
          this.$store.dispatch('tasks/patchBatch', payload)
        } else if (action.action) {
          payload = {
            parent: this,
            ids: [this.task.id]
          }
          this.$store.dispatch('tasks/' + action.action, payload)
        }
      })
    }
  },
  components: {
    TaskEditDialog
  }
}
</script>
