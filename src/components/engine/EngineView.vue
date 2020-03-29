<template>
  <div>
    <user-chip v-if="engine.technician" :user-id="engine.technician" class="full-width" />
    <q-chip class="full-width">
      <q-avatar :color="$models.engine.meta.color">SN</q-avatar>
      {{ engine.sn }}
    </q-chip>
    <customer-chip :customer-id="engine.customer" class="full-width" />

    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-6">
        <st-list model="call" :filters="filters" />
      </div>
      <div class="col-12 col-sm-6">
        <st-list model="task" :filters="filters" />
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
    StList: () => import('../generic/StList'),
    UserChip: () => import('../user/UserChip'),
    CustomerChip: () => import('../customer/CustomerChip')
  }
}
</script>
