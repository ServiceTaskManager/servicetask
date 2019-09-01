<template>
  <q-card>
    <q-card-section header>
      <span class="text-h6 full-width">{{ customer.name }}</span>
      <address-chip :address="{
        addr1: customer.addr1,
        addr2: customer.addr2,
        postal_code: customer.postal_code,
        city: customer.city,
        country: customer.country
        }"
        class="full-width" />
      <phone-chip :phone="customer.phone" class="full-width" />
      <q-btn class="absolute-top-right" icon="edit" color="grey" flat :to="{ name: 'customersEdit', params: { id: customer.id } }" />
    </q-card-section>

    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator>
      <q-tab name="main" icon="description" label="Overview" />
      <q-tab name="engines" icon="print" label="Engines" />
      <q-tab name="calls" icon="phone" label="Calls" />
      <q-tab name="tasks" icon="done" label="Tasks" />
    </q-tabs>
    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="main">
        Coming soon
      </q-tab-panel>
      <q-tab-panel name="engines">
        <engine-list :filters="{ customers: [customer.id], main: true }" hideCustomer hideFilters />
      </q-tab-panel>
      <q-tab-panel name="calls">
        <call-list :filters="{ customers: [customer.id] }"  />
      </q-tab-panel>
      <q-tab-panel name="tasks">
        <task-list :filters="{ customers: [customer.id] }" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import EngineList from '../components/EngineList'
import CallList from '../components/CallList'
import TaskList from '../components/TaskList'
import PhoneChip from '../components/PhoneChip'
import AddressChip from '../components/AddressChip'

export default {
  name: 'CustomerView',
  data () {
    return {
      tab: 'main',
      customer: this.$store.state.customers.data[this.$route.params.id]
    }
  },
  components: {
    EngineList,
    CallList,
    TaskList,
    PhoneChip,
    AddressChip
  }
}
</script>
