<template>
  <div class="row justify-end">
    <q-btn v-for="action in actions.filter(a => !a.more)"
      :key="action.label"
      flat round
      :icon="action.icon"
      :color="action.color" />

    <q-btn
      flat round
      :icon="selectedIds.length === 1 ? 'edit' : 'add'"
      @click="editDialog = true" />

    <q-btn v-if="selectedIds.length > 0"
      flat round
      icon="more_vert"
      @click="bottomSheet" />

    <customer-edit-dialog
      :data="data"
      v-model="editDialog" />
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
  data () {
    return {
      editDialog: false
    }
  },
  computed: {
    store () {
      return this.$route.meta.store
    },
    actions () {
      return this.$store.state[this.store].actions
    },
    selectedIds () {
      return this.$store.getters[this.store + '/selectedIds']
    },
    data () {
      return this.selectedIds.length === 1 ? this.$store.state[this.store].data[this.selectedIds[0]] : null
    }
  },
  methods: {
    bottomSheet () {
      this.$q.bottomSheet({
        message: this.selectedIds.length > 0 ? this.selectedIds.length + ' selected' : 'Actions',
        actions: this.actions.filter(a => a.more)
      }).onOk(action => {
        let payload = {}
        if (action.patch) {
          payload = {
            doc: action.patch,
            ids: this.selectedIds
          }
          this.$store.dispatch(this.store + '/patchBatch', payload)
        } else if (action.action) {
          payload = {
            parent: this,
            ids: this.selectedIds
          }
          this.$store.dispatch(this.store + '/' + action.action, payload)
        }
      })
    }
  },
  components: {
    CustomerEditDialog: () => import('./CustomerEditDialog')
  }
}
</script>
