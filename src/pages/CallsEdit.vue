<template>
  <q-card>
    <q-card-section class="q-pa-sm row">
      <select-customer v-model="call.customer" />
      <select-engine
        v-model="call.engine"
        :customer="call.customer" />
      <q-input
        v-model="call.title"
        label="Describe issue"
        class="full-width" />
      <q-input
        v-model="call.person"
        color="orange"
        label="Person to contact"
        class="full-width">
        <template v-slot:prepend>
          <q-icon name="person" color="orange" />
        </template>
      </q-input>
      <q-input
        v-model="call.phone"
        color="green"
        label="Phone number"
        class="full-width">
        <template v-slot:prepend>
          <q-icon name="phone" color="green" />
        </template>
      </q-input>
      <q-input
        v-model="call.teamviewer_id"
        color="blue"
        label="Teamviewer ID"
        class="col-6">
        <template v-slot:prepend>
          <q-icon name="screen_share" color="blue" />
        </template>
      </q-input>
      <q-input
        v-model="call.teamviewer_pwd"
        color="blue"
        label="Password"
        class="col-6"/>
    </q-card-section>

    <q-separator />

    <q-card-actions align="around">
      <q-btn round flat color="white" class="bg-negative" icon="undo" :to="{ name: 'calls' }" />
      <q-btn round flat color="white" class="bg-positive" icon="done" @click='setCall' />
    </q-card-actions>
  </q-card>
</template>

<script>
import SelectCustomer from '../components/SelectCustomer'
import SelectEngine from '../components/SelectEngine'

export default {
  name: 'CallsEdit',
  data () {
    return {
      id: '',
      create: true,
      call: {}
    }
  },
  mounted () {
    this.getCall()
  },
  methods: {
    getCall () {
      this.id = this.$route.params.id
      this.create = this.id === 'create'
      this.call = this.create ? this.$store.state.calls.call : this.$store.state.calls.data[this.id]
    },
    setCall () {
      let action = this.create ? 'insert' : 'patch'
      this.$store.dispatch('calls/' + action, this.call).then(r => {
        this.$q.notify({
          message: 'Call set',
          color: 'positive',
          icon: 'info'
        })
        this.$router.push({ name: 'calls' })
        this.$store.state.calls.call = {}
      })
    }
  },
  components: {
    SelectCustomer,
    SelectEngine
  }
}
</script>
