<template>
  <div>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      :active-color="$calls.meta.color"
      :indicator-color="$calls.meta.color"
      align="justify"
      narrow-indicator>
      <q-tab name="unassigned" icon="phone_callback" label="Incoming call">
        <q-badge :label="stats.unassigned" :color="$calls.meta.color" floating></q-badge>
      </q-tab>
      <q-tab name="assigned" icon="person" label="Assigned">
        <q-badge :label="stats.assigned" :color="$calls.meta.color" floating></q-badge>
      </q-tab>
      <q-tab name="closed" icon="done" label="Closed">
        <q-badge :label="stats.closed" :color="$calls.meta.color" floating></q-badge>
      </q-tab>
    </q-tabs>
    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="unassigned">
        <call-list :filters="callsUnassignedFilters" />
      </q-tab-panel>
      <q-tab-panel name="assigned">
        <call-list :filters="callsAssignedFilters" />
      </q-tab-panel>
      <q-tab-panel name="closed">
        <call-list :filters="callsClosedFilters" />
      </q-tab-panel>
    </q-tab-panels>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="black" @click="callCreate = true" />
    </q-page-sticky>

    <call-edit-dialog v-model="callCreate" />
  </div>
</template>

<script>
import CallList from '../components/CallList'
import CallEditDialog from '../components/CallEditDialog'

export default {
  name: 'Calls',
  data () {
    return {
      tab: 'unassigned',
      callCreate: false,
      callsUnassignedFilters: { status: ['==', 'unassigned'] },
      callsAssignedFilters: { status: ['==', 'assigned'] },
      callsClosedFilters: { status: ['==', 'closed'] }
    }
  },
  computed: {
    stats () {
      return this.$store.getters['calls/stats']
    }
  },
  components: {
    CallList,
    CallEditDialog
  }
}
</script>
