<template>
  <div>
    <user-chip v-if="engine.technician" :user-id="engine.technician" class="full-width" />
    <q-chip class="full-width">
      <q-avatar :color="$engines.meta.color">SN</q-avatar>
      {{ engine.sn }}
    </q-chip>
    <customer-chip :customer-id="engine.customer" class="full-width" />

    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-6">
        <call-list :filters="filter" hide-customer hide-engine />
      </div>
      <div class="col-12 col-sm-6">
        <task-list :filters="filter" hide-customer hide-engine />
      </div>
    </div>
  </div>
</template>

<script>
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
      filter: [
        ['customer', '==', this.engine.customer],
        ['engine', 'includes', this.engine.id]
      ]
    }
  },
  mounted () {
    this.$ui.header.title = this.engine.name + ' SN/' + this.engine.sn
    this.$root.$on('editDialog', () => { this.editDialog = true })
  },
  components: {
    CallList: () => import('../call/CallList'),
    TaskList: () => import('../task/TaskList'),
    UserChip: () => import('../user/UserChip'),
    CustomerChip: () => import('../customer/CustomerChip')
  }
}
</script>
