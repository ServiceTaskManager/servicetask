<template>
  <q-card>
    <q-card-section header>
      <span class="text-h6 full-width">{{ engine.name }}</span>
      <span class="text-grey">{{ engine.sn }}</span>
      <customer-chip :customer-id="engine.customer" class="full-width" />
      <q-btn class="absolute-top-right" icon="edit" color="grey" flat :to="{ name: 'enginesEdit', params: { id: engine.id } }" />
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
      <q-tab name="calls" icon="phone" label="Calls" />
      <q-tab name="tasks" icon="done" label="Tasks" />
    </q-tabs>
    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="main">
        {{ engine }}
      </q-tab-panel>
      <q-tab-panel name="calls">
        <call-list :filters="{ engines: [engine.id] }"  />
      </q-tab-panel>
      <q-tab-panel name="tasks">
        <task-list :filters="{ engines: [engine.id] }" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import CallList from '../components/CallList'
import TaskList from '../components/TaskList'
import CustomerChip from '../components/CustomerChip'

export default {
  name: 'EngineView',
  data () {
    return {
      tab: 'main',
      engine: this.$store.state.engines.data[this.$route.params.id]
    }
  },
  components: {
    CallList,
    TaskList,
    CustomerChip
  }
}
</script>
