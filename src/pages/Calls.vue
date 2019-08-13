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
        <q-tab name="new" icon="phone_callback" label="Incoming call">
          <q-badge :label="$store.getters['calls/getNew'].length" floating></q-badge>
        </q-tab>
        <q-tab name="assigned" icon="person" label="Assigned">
          <q-badge :label="$store.getters['calls/getAssigned'].length" floating></q-badge>
        </q-tab>
        <q-tab name="close" icon="done" label="Closed">
          <q-badge :label="$store.getters['calls/getClosed'].length" floating></q-badge>
        </q-tab>
      </q-tabs>
      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="new">
          <q-list>
            <call-item
              v-for="call in $store.getters['calls/getNew']"
              :key="call.id"
              :id="call.id"
              :call="call" />
          </q-list>
        </q-tab-panel>
        <q-tab-panel name="assigned">
          <q-list>
            <call-item
              v-for="call in $store.getters['calls/getAssigned']"
              :key="call.id"
              :id="call.id"
              :call="call" />
          </q-list>
        </q-tab-panel>
        <q-tab-panel name="new">
          <q-list>
            <call-item
              v-for="call in $store.getters['calls/getClosed']"
              :key="call.id"
              :id="call.id"
              :call="call" />
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="black" @click="createCall" />
    </q-page-sticky>
  </div>
</template>

<script>
import CallItem from '../components/CallItem'

export default {
  name: 'Calls',
  data () {
    return {
      tab: 'new'
    }
  },
  components: {
    CallItem
  },
  methods: {
    createCall () {
      this.$store.state.calls.call = this.$store.state.calls.default
      this.$router.push({ name: 'callsCreate', params: { id: 'create' } })
    }
  }
}
</script>
