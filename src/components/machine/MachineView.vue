<template>
  <div>
    <user-chip v-if="machine.technician" :user-id="machine.technician" class="full-width" />
    <q-chip class="full-width">
      <q-avatar :color="$models.machine.meta.color">SN</q-avatar>
      {{ machine.sn }}
    </q-chip>
    <customer-chip :customer-id="machine.customer" class="full-width" />

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
  name: 'MachineTabPanel',
  props: {
    machine: {
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
        ['customer', '==', this.machine.customer],
        ['machine', 'includes', this.machine.id]
      ]
    }
  },
  mounted () {
    this.$ui.header.title = this.machine.name + ' SN/' + this.machine.sn
    this.$root.$on('editDialog', () => { this.editDialog = true })
  },
  components: {
    StList: () => import('../generic/StList'),
    UserChip: () => import('../user/UserChip'),
    CustomerChip: () => import('../customer/CustomerChip')
  }
}
</script>
