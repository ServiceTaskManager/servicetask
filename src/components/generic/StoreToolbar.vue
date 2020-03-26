<template>
  <div class="row justify-end">
    <q-btn v-for="(action, key) in toolbarActions" :key="key"
      dense
      v-bind="action.props"
      @click="triggerAction(action)" />

    <q-btn v-if="get('selectedIds').length > 0"
      icon="more_vert"
      flat round dense
      @click="bottomSheet" />
  </div>
</template>

<script>
export default {
  name: 'StoreToolbar',
  props: {
    store: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      editDialog: false
    }
  },
  computed: {
    toolbarActions () {
      return this.get('toolbarActions').filter(a => a.customFilter(this))
    }
  },
  methods: {
    get (getter) {
      return this.$store.getters[this.store + '/' + getter]
    },
    bottomSheet () {
      this.$q.bottomSheet({
        message: 'Actions',
        actions: this.get('actions').filter(a => !a.toolbar)
      }).onOk(action => {
        this.triggerAction(action)
      })
    },
    triggerAction (action) {
      const selectedIds = this.get('selectedIds')
      if (action.patch) {
        let payload = {
          doc: action.patch,
          ids: selectedIds
        }
        this.$store.dispatch(this.store + '/patchBatch', payload)
      } else if (action.action) {
        this.$store.dispatch(this.store + '/' + action.action, this)
      }
    }
  }
}
</script>
