<template>
  <q-card :key="data.id">
    <q-card-section
      class="q-pa-sm text-white"
      :class="data.machine_down ? 'bg-negative' : 'bg-grey-9'">
      <div class="text-h6 ellipsis">
        {{ data.title }}
        <q-popup-edit v-model="data.title" v-if="edit">
          <q-input v-model="data.title" label="Describe issue" dense autofocus />
        </q-popup-edit>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-pa-sm row bg-grey-7">
      <s-select-customer
        v-model="data.customer"
        :readonly="!edit" />
      <q-input
        v-model="data.person"
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
        v-model="data.phone"
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
        v-model="data.teamviewer_id"
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
        v-model="data.teamviewer_pwd"
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
        v-model="data.machine_down"
        @input="updateCall" />
      <q-btn round flat color="positive" type="a" :href="'tel:'+data.phone" icon="phone" />
      <q-btn round flat color="white" icon="edit" @click="edit = true" />
    </q-card-actions>
    <q-card-actions align="around" class="bg-white" v-else>
      <q-btn round flat color="negative" icon="cancel" @click='edit =false' />
      <q-btn round flat color="positive" icon="done" @click='updateCall' />
    </q-card-actions>
  </q-card>
</template>

<script>
import { QCard, QBtn } from 'quasar'
import SSelectCustomer from './SSelectCustomer'

export default {
  name: 'SCustomer',
  props: ['data'],
  data () {
    return {
      edit: false
    }
  },
  computed: {
    customer () {
      let customerData = this.$store.state.customers.data[this.data.customer]
      let customerDefault = this.$store.state.model.models.customers.default
      let customer = customerData || customerDefault
      return customer
    }
  },
  methods: {
    deleteCall () {
      this.$store.dispatch('calls/delete', this.data.id)
    },
    updateCall () {
      this.$store.dispatch('calls/patch', this.data)
      this.edit = false
    },
    toggleMachineDown () {
      console.log(this.data.machine_down)
      this.data.machine_down = !this.data.machine_down
      console.log(this.data.machine_down)
      this.updateCall()
    }
  },
  components: {
    QCard,
    QBtn,
    SSelectCustomer
  }
}
</script>
