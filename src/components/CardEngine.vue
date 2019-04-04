<template>
  <q-card
    :key="engine.id">
    <q-card-section
      class="q-pa-sm text-white bg-grey-9">
      <div class="text-h6 ellipsis">
        {{ customer.name }} {{ engine.type }}
      </div>
    </q-card-section>

    <q-card-section class="q-pa-sm row bg-grey-7">
      <select-customer
        v-model="engine.customer"
        :readonly="!edit" />
      <q-select
        v-model="engine.type"
        :options='$store.state.config.engineTypes'
        color="teal"
        label="Engine"
        :readonly="!edit"
        class="full-width"
        dense>
        <template v-slot:prepend>
          <q-icon name="print" color="teal" />
        </template>
      </q-select>
      <q-input
        v-model="engine.sn"
        color="green"
        label="Serial number"
        :readonly="!edit"
        class="full-width"
        type="number"
        dense>
        <template v-slot:prepend>
          <q-icon name="phone" color="green" />
        </template>
      </q-input>
      <q-select
        multiple
        v-model="engine.ugks"
        :options='$store.state.config.ugks'
        color="black"
        label="Upgrade"
        :readonly="!edit"
        :displayValue="engine.ugks.length > 1 ? engine.ugks.length + ' upgrades' : engine.ugks[0]"
        class="full-width"
        dense>
        <template v-slot:prepend>
          <q-icon name="lock" color="yellow" />
        </template>
      </q-select>
    </q-card-section>

    <q-separator />

    <q-card-actions align="around" class="bg-grey-9" v-if="!edit">
      <q-btn round flat color="negative" icon="delete" @click='deleteEngine' />
      <q-btn round flat color="white" icon="edit" @click="edit = true" />
    </q-card-actions>
    <q-card-actions align="around" class="bg-white" v-else>
      <q-btn round flat color="negative" icon="cancel" @click="engine.create ? deleteEngine() : edit = false" />
      <q-btn round flat color="positive" icon="done" @click="updateEngine" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { QCard, QBtn } from 'quasar'
import SelectCustomer from './SelectCustomer'

export default {
  name: 'CardEngine',
  props: ['engine'],
  data () {
    return {
      edit: false
    }
  },
  mounted () {
    this.edit = this.engine.create || false
  },
  computed: {
    customer () {
      let customerData = this.$store.state.customers.data[this.engine.customer]
      let customerDefault = this.$store.state.customers.default
      let customer = customerData || customerDefault
      return customer
    }
  },
  methods: {
    deleteEngine () {
      console.log('Delete engine ' + this.engine.id)
      this.$store.dispatch('engines/delete', this.engine.id)
    },
    updateEngine () {
      console.log('Update engine ' + this.engine.id)
      this.engine.create = false
      this.$store.dispatch('engines/set', this.engine)
      this.edit = false
    },
    toggleMachineDown () {
      this.engine.machine_down = !this.engine.machine_down
      this.updateEngine()
    }
  },
  components: {
    QCard,
    QBtn,
    SelectCustomer
  }
}
</script>
