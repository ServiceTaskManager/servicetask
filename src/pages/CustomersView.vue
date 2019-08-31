<template>
  <q-card>
    <q-card-section header class="row">
      <span class="text-h6 full-width">{{ customer.name }}</span>
      <address-chip :address="{
        addr1: customer.addr1,
        addr2: customer.addr2,
        postal_code: customer.postal_code,
        city: customer.city,
        country: customer.country
        }" />
      <phone-chip :phone="customer.phone" />
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
      <q-tab name="engines" icon="print" label="Engines">
        <q-badge :label="engines.length" floating></q-badge>
      </q-tab>
      <q-tab name="calls" icon="phone" label="Calls">
        <q-badge :label="calls.length" floating></q-badge>
      </q-tab>
      <q-tab name="tasks" icon="done" label="Tasks">
      </q-tab>
    </q-tabs>
    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="main">
        <p>{{ calls.length }} calls open</p>
        <p>{{ engines.length }} engines</p>
      </q-tab-panel>
      <q-tab-panel name="engines">
        <engine-chip v-for="engine in engines" :key="engine.id" :engine="engine" />
      </q-tab-panel>
      <q-tab-panel name="calls">
        <q-list>
          <call-item
            v-for="call in calls"
            :key="call.id"
            :call="call" />
        </q-list>
      </q-tab-panel>
      <q-tab-panel name="tasks">
        <task-list :filters="{ customers: [customer.id], done: false }" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import EngineChip from '../components/EngineChip'
import CallItem from '../components/CallItem'
import TaskList from '../components/TaskList'
import PhoneChip from '../components/PhoneChip'
import AddressChip from '../components/AddressChip'

export default {
  name: 'CustomerView',
  data () {
    return {
      tab: 'main',
      customer: this.$store.state.customers.data[this.$route.params.id],
      engines: this.$store.getters['engines/byCustomer'](this.$route.params.id),
      calls: this.$store.getters['calls/byCustomer'](this.$route.params.id)
    }
  },
  components: {
    EngineChip,
    CallItem,
    TaskList,
    PhoneChip,
    AddressChip
  }
}
</script>
