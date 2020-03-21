<template>
  <div>
    <q-tabs
      v-model="tab"
      dense
      align="justify"
      narrow-indicator>
      <q-tab name="customer" icon="description" label="Overview" :class="'text-' + $customers.meta.color" />
      <q-tab name="engines" icon="print" label="Engines" :class="'text-' + $engines.meta.color" />
      <q-tab name="calls" icon="phone" label="Calls" :class="'text-' + $calls.meta.color" />
      <q-tab name="tasks" icon="done" label="Tasks" :class="'text-' + $tasks.meta.color" />
    </q-tabs>
    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="customer">
        <user-chip v-if="customer.technician"
          :user-id="customer.technician"
          class="full-width">
          <span class="text-grey q-mr-sm">Technician :</span>
        </user-chip>
        <address-chip :address="customer.address" class="full-width" />
        <phone-chip :phone="customer.phone" class="full-width" />
      </q-tab-panel>
      <q-tab-panel name="engines">
        <engine-list :filters="enginesFilter" hide-customer hideFilters />
      </q-tab-panel>
      <q-tab-panel name="calls">
        <call-list :filters="filterByCustomer" hide-customer />
      </q-tab-panel>
      <q-tab-panel name="tasks">
        <task-list :filters="filterByCustomer" hide-customer />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  name: 'CustomerView',
  data () {
    return {
      tab: 'customer',
      filterByCustomer: [['customer', '==', this.$route.params.id]],
      enginesFilter: [
        ['customer', '==', this.$route.params.id],
        ['main', '==', true]]
    }
  },
  mounted () {
    this.$store.dispatch('customers/selectOneOnly', this.customer.id)
  },
  computed: {
    customer () {
      return this.$customers.data[this.$route.params.id]
    }
  },
  components: {
    EngineList: () => import('../components/engine/EngineList'),
    CallList: () => import('../components/call/CallList'),
    TaskList: () => import('../components/task/TaskList'),
    UserChip: () => import('../components/user/UserChip'),
    PhoneChip: () => import('../components/generic/PhoneChip'),
    AddressChip: () => import('../components/generic/AddressChip')
  }
}
</script>
