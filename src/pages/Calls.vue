<template>
  <div class="container">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator>
        <q-tab name="unassigned" icon="phone_callback" label="Incoming call">
          <q-badge :label="stats.unassigned" floating></q-badge>
        </q-tab>
        <q-tab name="assigned" icon="person" label="Assigned">
          <q-badge :label="stats.assigned" floating></q-badge>
        </q-tab>
        <q-tab name="closed" icon="done" label="Closed">
          <q-badge :label="stats.closed" floating></q-badge>
        </q-tab>
      </q-tabs>
      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="unassigned">
          <q-list>
            <call-item
              v-for="call in $store.getters['calls/byStatus'](['unassigned'])"
              :key="call.id"
              :id="call.id"
              :call="call" />
          </q-list>
        </q-tab-panel>
        <q-tab-panel name="assigned">
          <q-list>
            <call-item
              v-for="call in $store.getters['calls/byStatus'](['assigned'])"
              :key="call.id"
              :id="call.id"
              :call="call" />
          </q-list>
        </q-tab-panel>
        <q-tab-panel name="closed">
          <q-list>
            <call-item
              v-for="call in $store.getters['calls/byStatus'](['closed'])"
              :key="call.id"
              :id="call.id"
              :call="call" />
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="black" :to="{ name: 'callsCreate', params: { id: 'create' } }" />
    </q-page-sticky>
  </div>
</template>

<script>
import CallItem from '../components/CallItem'

export default {
  name: 'Calls',
  data () {
    return {
      tab: 'unassigned'
    }
  },
  computed: {
    stats () {
      return this.$store.getters['calls/stats']
    }
  },
  components: {
    CallItem
  }
}
</script>
