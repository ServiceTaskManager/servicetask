<template>
  <q-page padding class="justify-center">
    <q-pull-to-refresh :handler="refresher">
      <q-list bordered class="rounded-borders" style="max-width: 100%">
        <q-item
          v-for="call in calls"
          :key="call.id">
          <q-item-section avatar top>
            <q-icon name="done" color="positive" size="34px" v-if="call.status == 'close'" />
            <q-icon name="warning" color="negative" size="34px" v-else-if="!call.assigned_to" />
            <q-icon name="assignment_ind" color="warning" size="34px" v-else-if="call.assigned_to" />
          </q-item-section>

          <q-item-section top class="col-2 gt-sm">
            <q-item-label lines="1">
              <span class="text-weight-bold">{{ call.customer }}</span>
            </q-item-label>
            <q-item-label caption lines="1">
              <span class="gt-xs text-grey-8"> {{ formatDate(call.open_date) }}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section top>
            <q-item-label lines="1" class="lt-md">
              <span class="text-weight-bold">{{ call.customer }}</span>
            </q-item-label>
            <q-item-label lines="1">
              <span class="text-weight-medium">{{ call.description }}</span>
            </q-item-label>
            <q-item-label lines="1">
              <q-btn color="positive">
                <q-icon left name="phone" @click.native="openURL(call.phone_number)" />
                <div class="gt-xs">{{ call.phone_number }}</div>
              </q-btn> {{ call.teamviewer_id }} {{ call.status }}
            </q-item-label>
          </q-item-section>

          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn class="gt-xs" size="12px" flat dense round icon="assignment_ind" @click="assignCall(call.id)" />
              <q-btn class="gt-xs" size="12px" flat dense round icon="done" @click="toggleStatusCall(call.id)" />
              <q-btn class="gt-xs" size="12px" flat dense round icon="edit" v-bind:to="'calls/edit/'+call.id" />
              <q-btn size="12px" flat dense round icon="more_vert" />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-pull-to-refresh>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        color="primary"
        icon="add"
        to="/calls/edit"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { openURL, date } from 'quasar'

export default {
  name: 'Calls',
  mounted () {
    this.getCalls()
  },
  data () {
    return {
      actionCall: {},
      calls: []
    }
  },
  watch: {
    page () {
      this.getCalls()
    }
  },
  methods: {
    openURL,
    refresher (done) {
      this.getCalls()

      done()
    },
    getCalls () {
      let filter = {
        order: 'open_date DESC'
      }
      this.$axios.get('http://192.168.1.35:3000/api/Calls?filter=' + JSON.stringify(filter))
        .then((response) => {
          this.calls = response.data
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            icon: 'report_problem'
          })
        })
    },
    assignCall (callId) {
      this.actionCall = this.calls.find(call => call.id === callId)
      this.actionCall.assigned_to = (!this.actionCall.assigned_to) ? 'Myself' : ''
      this.patchCall('Change assignement')
    },
    toggleStatusCall (callId) {
      this.actionCall = this.calls.find(call => call.id === callId)
      this.actionCall.status = (this.actionCall.status === 'open') ? 'close' : 'open'
      this.patchCall('Change status')
    },
    patchCall (message) {
      this.$axios.patch('http://192.168.1.35:3000/api/Calls/', this.actionCall)
        .then((response) => {
          this.$q.notify({
            color: 'positive',
            message: message,
            icon: 'done'
          })
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            message: 'Failed to assign call',
            icon: 'report_problem'
          })
        })
    },
    composePhoneNumber () {
      this.openURL('tel:' + this.actionCall.phone_number)
    },
    formatDate (dateInput) {
      return date.formatDate(dateInput, 'DD/MM HH:MM')
    }
  }
}
</script>

<style>
</style>
