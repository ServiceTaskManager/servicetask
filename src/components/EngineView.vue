<template>
  <div>
    <q-chip class="full-width">
      <q-avatar :color="$engines.meta.color">SN</q-avatar>
      {{ engine.sn }}
    </q-chip>
    <customer-chip :customer-id="engine.customer" class="full-width" />

    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-6">
        <call-list :filters="filter" hide-filters add-button />
      </div>
      <div class="col-12 col-sm-6">
        <task-list :filters="filter" hide-filters add-button />
      </div>
    </div>
  </div>
</template>

<script>
import CallList from './CallList'
import TaskList from './TaskList'
import CustomerChip from './CustomerChip'

export default {
  name: 'EngineTabPanel',
  props: {
    engine: {
      type: Object,
      default: () => {
        return this.$engines.default
      }
    }
  },
  data () {
    return {
      tab: 'calls'
    }
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
    CustomerChip
  }
}
</script>
