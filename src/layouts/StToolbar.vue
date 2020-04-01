<template>
  <div class="row justify-end">
    <q-btn v-for="(action, key) in toolbarActions" :key="key"
      dense
      v-bind="action.props"
      @click="triggerAction(action)" />

    <q-btn v-if="selectedIds.length > 0"
      icon="more_vert"
      flat round dense
      @click="bottomSheet" />
  </div>
</template>

<script>
export default {
  name: 'StToolbar',
  props: {
    model: {
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
    actions () {
      return this.$models[this.model].actions || []
    },
    toolbarActions () {
      return this.$models[this.model].actions.filter(a => {
        if (a.customFilter) return (a.toolbar && a.customFilter(this))
        else return a.toolbar
      })
    },
    selectedIds () {
      return this.$store.getters[this.model + 's/selectedIds']
    }
  },
  methods: {
    bottomSheet () {
      this.$q.bottomSheet({
        message: 'Actions',
        actions: this.actions.filter(a => !a.toolbar)
      }).onOk(action => {
        this.triggerAction(action)
      })
    },
    triggerAction (action) {
      if (action.patch) {
        let payload = {
          doc: action.patch,
          ids: this.selectedIds
        }
        this.$store.dispatch(this.model + 's/patchBatch', payload)
      } else if (action.action) {
        console.log(action.action)
        this.$store.dispatch(this.model + 's/' + action.action, this)
      }
    }
  }
}
</script>
