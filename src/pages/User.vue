<template>
  <div>
    <q-tabs
      v-model="tab"
      dense
      align="justify"
      narrow-indicator>
      <q-tab name="user" :icon="$users.meta.icon" label="Overview" :class="'text-' + $users.meta.color" />
      <q-tab name="customers" :icon="$customers.meta.icon" label="Customers" :class="'text-' + $customers.meta.color" />
      <q-tab name="engines" :icon="$engines.meta.icon" label="Engines" :class="'text-' + $engines.meta.color" />
      <q-tab name="calls" :icon="$calls.meta.icon" label="Calls" :class="'text-' + $calls.meta.color" />
      <q-tab name="tasks" :icon="$tasks.meta.icon" label="Tasks" :class="'text-' + $tasks.meta.color" />
    </q-tabs>
    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="user">
        Coming soon
      </q-tab-panel>
      <q-tab-panel name="customers">
        <customer-list :filters="filterByUser" hideFilters />
      </q-tab-panel>
      <q-tab-panel name="engines">
        <engine-list :filters="enginesFilter" hideFilters />
      </q-tab-panel>
      <q-tab-panel name="calls">
        <call-list :filters="filterByUser" />
      </q-tab-panel>
      <q-tab-panel name="tasks">
        <task-list :filters="filterByUser" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import CustomerList from '../components/CustomerList'
import EngineList from '../components/EngineList'
import CallList from '../components/CallList'
import TaskList from '../components/TaskList'

export default {
  name: 'CustomerView',
  data () {
    return {
      editDialog: false,
      tab: 'user',
      customer: this.$customers.default,
      filterByUser: [['user', '==', this.$route.params.id]]
    }
  },
  mounted () {
    this.user = this.$users.data[this.$route.params.id]
    this.$ui.header.title = this.user.name
  },
  computed: {
    enginesFilter () {
      let customersIds = this.$store.getters['customers/filter'](this.filterByUser).map(c => c.id)
      return [
        ['customer', 'includes', customersIds],
        ['main', '==', true]]
    }
  },
  components: {
    CustomerList,
    EngineList,
    CallList,
    TaskList
  }
}
</script>
