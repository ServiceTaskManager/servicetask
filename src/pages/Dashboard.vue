<template>
  <div class="row">
    <q-card class="col-12 col-sm-4">
      <q-card-section class="row q-pa-xs">
        <q-circular-progress
          show-value
          class="q-ma-xs q-pa-none"
          :value="callKnob"
          size="90px"
          :thickness="0.2"
          color="green"
          center-color="white"
          track-color="orange">
          {{  callAssigned.length }} / {{ callNew.length + callAssigned.length }}
        </q-circular-progress>
        <div v-if="callNew.length === 0" class="vertical-middle q-px-sm">
          <span class="text-h5">Congrats,</span><br>
          <span caption>all the calls are assigned.</span>
        </div>
        <div v-else class="vertical-middle q-px-sm">
          <span class="text-h5">{{ callNew.length }} customers</span><br>
          <span caption>are waiting for a call back.</span>
        </div>
        <div class="absolute-bottom-right">
          <q-btn :to="{ name: 'callsCreate', params: { id: 'create' } }"
            flat round
            icon="add"
            color="primary"
            class="float-right on-right" />
          <q-btn :to="{ name: 'calls' }"
            flat round
            icon="list"
            color="grey-8"
            class="float-right on-right" />
        </div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <q-list>
          <q-separator />
          <div v-if="callNew.length > 0">
            <q-item-label header class="q-pa-sm">New calls</q-item-label>
            <call-item-light
              v-for="call in callNew"
              :key="call.id"
              :id="call.id"
              :call="call" />
          </div>
          <q-separator />
          <div v-if="callAssigned.length > 0">
            <q-item-label header class="q-pa-sm">Assigned calls</q-item-label>
            <call-item-light
              v-for="call in callAssigned"
              :key="call.id"
              :id="call.id"
              :call="call" />
          </div>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import CallItemLight from '../components/CallItemLight'

export default {
  name: 'Dashboard',
  data () {
    return {
      tasks: []
    }
  },
  computed: {
    callNew () {
      return this.$store.getters['calls/getNew']
    },
    callAssigned () {
      return this.$store.getters['calls/getAssigned']
    },
    callKnob () {
      return this.callAssigned.length / (this.callAssigned.length + this.callNew.length) * 100
    }
  },
  components: {
    CallItemLight
  }
}
</script>
