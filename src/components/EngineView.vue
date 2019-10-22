<template>
  <div>
    <q-chip class="full-width">
      <q-avatar :color="$engines.meta.color">SN</q-avatar>
      {{ engine.sn }}
    </q-chip>
    <customer-chip :customer-id="engine.customer" class="full-width" />

    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-6">
        <call-list :filters="filter" hide-filters hide-customer hide-engine add-button />
      </div>
      <div class="col-12 col-sm-6">
        <task-list :filters="filter" hide-filters hide-customer hide-engine add-button />
      </div>
    </div>

    <engine-edit-dialog v-model="editDialog" :engine="engine" />
  </div>
</template>

<script>
import CallList from './CallList'
import TaskList from './TaskList'
import CustomerChip from './CustomerChip'
import EngineEditDialog from './EngineEditDialog'

export default {
  name: 'EngineTabPanel',
  props: {
    engine: {
      type: Object,
      default: () => {
        return undefined
      }
    }
  },
  data () {
    return {
      tab: 'calls',
      editDialog: false
    }
  },
  mounted () {
    this.$ui.header.title = this.engine.name + ' SN/' + this.engine.sn
    this.$root.$on('editDialog', () => { this.editDialog = true })
  },
  computed: {
    filter () {
      return {
        customer: ['includes', [this.engine.customer]],
        engine: ['includes', [this.engine.id]]
      }
    }
  },
  components: {
    CallList,
    TaskList,
    CustomerChip,
    EngineEditDialog
  }
}
</script>
