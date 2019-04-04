<template>
  <q-card
    :key="call.id">
    <q-card-section
      class="q-pa-sm text-white"
      :class="call.machine_down ? 'bg-negative' : 'bg-grey-9'">
      <div class="text-h6 ellipsis">
        {{ call.title || 'undefined' }}
        <q-popup-edit v-model="call.title" v-if="edit" >
          <q-input v-model="call.title" label="Describe issue" dense autofocus />
        </q-popup-edit>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-pa-sm row bg-grey-7">
      <select-customer
        v-model="call.customer"
        :readonly="!edit" />
      <select-engine
        v-model="call.engine"
        :readonly="!edit"
        :customer="call.customer" />
      <q-input
        v-model="call.person"
        color="orange"
        label="Person to contact"
        :readonly="!edit"
        class="full-width"
        dense>
        <template v-slot:prepend>
          <q-icon name="person" color="orange" />
        </template>
      </q-input>
      <q-input
        v-model="call.phone"
        color="green"
        label="Phone number"
        :readonly="!edit"
        class="full-width"
        dense>
        <template v-slot:prepend>
          <q-icon name="phone" color="green" />
        </template>
      </q-input>
      <q-input
        v-model="call.teamviewer_id"
        color="blue"
        label="Teamviewer ID"
        :readonly="!edit"
        class="col-6"
        dense>
        <template v-slot:prepend>
          <q-icon name="screen_share" color="blue" />
        </template>
      </q-input>
      <q-input
        v-model="call.teamviewer_pwd"
        color="blue"
        label="Password"
        :readonly="!edit"
        class="col-6"
        dense />
    </q-card-section>

    <q-separator />

    <q-card-actions align="around" class="bg-grey-9" v-if="!edit">
      <q-btn round flat color="secondary" icon="forward" />
      <q-btn round flat color="positive" icon="done" @click='deleteCall' />
      <q-toggle
        color="negative"
        icon="warning"
        v-model="call.machine_down"
        @input="updateCall" />
      <q-btn round flat color="positive" type="a" :href="'tel:'+call.phone" icon="phone" />
      <q-btn round flat color="white" icon="edit" @click="edit = true" />
    </q-card-actions>
    <q-card-actions align="around" class="bg-white" v-else>
      <q-btn round flat color="negative" icon="cancel" @click="call.create ? deleteCall() : edit = false" />
      <q-btn round flat color="positive" icon="done" @click="updateCall" />
    </q-card-actions>
  </q-card>
</template>

<script>
import SelectCustomer from './SelectCustomer'
import SelectEngine from './SelectEngine'

export default {
  name: 'CardCall',
  props: ['call'],
  data () {
    return {
      edit: false
    }
  },
  mounted () {
    this.edit = this.call.create || false
  },
  computed: {
    customer () {
      let customerData = this.$store.state.customers.data[this.call.customer]
      let customerDefault = this.$store.state.model.models.customers.default
      let customer = customerData || customerDefault
      return customer
    }
  },
  methods: {
    deleteCall () {
      console.log('Delete call ' + this.call.id)
      this.$store.dispatch('calls/delete', this.call.id)
    },
    updateCall () {
      console.log('Update call ' + this.call.id)
      this.call.create = false
      this.$store.dispatch('calls/set', this.call)
      this.edit = false
    },
    toggleMachineDown () {
      this.call.machine_down = !this.call.machine_down
      this.updateCall()
    }
  },
  components: {
    SelectCustomer,
    SelectEngine
  }
}
</script>
