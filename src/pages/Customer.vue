<template>
  <div>
    <q-tabs
      v-model="tab"
      dense
      align="justify"
      narrow-indicator>
      <q-tab name="customers" icon="description" label="Overview" :class="'text-' + $customers.meta.color" />
      <q-tab name="engines" icon="print" label="Engines" :class="'text-' + $engines.meta.color" />
      <q-tab name="calls" icon="phone" label="Calls" :class="'text-' + $calls.meta.color" />
      <q-tab name="tasks" icon="done" label="Tasks" :class="'text-' + $tasks.meta.color" />
    </q-tabs>
    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="customers">
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

    <customer-edit-dialog :customer="customer" v-model="editDialog" />
  </div>
</template>

<script>
import EngineList from '../components/EngineList'
import CallList from '../components/CallList'
import TaskList from '../components/TaskList'
import PhoneChip from '../components/PhoneChip'
import AddressChip from '../components/AddressChip'
import CustomerEditDialog from '../components/CustomerEditDialog'

export default {
  name: 'CustomerView',
  data () {
    return {
      editDialog: false,
      tab: 'customers',
      customer: this.$customers.default,
      filterByCustomer: { customer: ['includes', this.$route.params.id] },
      enginesFilter: {
        customer: ['includes', this.$route.params.id],
        main: ['==', true]
      }
    }
  },
  mounted () {
    this.customer = this.$customers.data[this.$route.params.id]
    this.$ui.header.title = this.customer.name
    this.$root.$on('editDialog', () => { this.editDialog = true })
  },
  components: {
    EngineList,
    CallList,
    TaskList,
    PhoneChip,
    AddressChip,
    CustomerEditDialog
  }
}
</script>
