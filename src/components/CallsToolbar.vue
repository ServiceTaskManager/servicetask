<template>
  <div class="row justify-end">
    <q-btn
      flat round
      icon="add"
      @click="callDialog = true" />
    <q-btn
      flat round
      icon="more_vert"
      @click="bottomSheet" />

    <call-edit-dialog v-model="callDialog" />
  </div>
</template>

<script>
import CallEditDialog from './CallEditDialog'

export default {
  name: 'CallsToolbar',
  data () {
    return {
      callDialog: false,
      createWOTask: false
    }
  },
  computed: {
    actions () {
      return this.$store.getters['calls/getActions']()
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
          this.$store.dispatch('calls/patchBatch', payload)
        } else if (action.action) {
          payload = {
            parent: this,
            ids: this.$ui.selected
          }
          this.$store.dispatch('calls/' + action.action, payload)
        }
        this.$ui.selected = []
      })
    }
  },
  components: {
    CallEditDialog
  }
}
</script>
