<template>
  <q-card
    :key="customer.id">
    <q-card-section
      class="q-pa-sm text-white bg-grey-9">
      <div class="text-h6 ellipsis">
        {{ customer.name || 'undefined' }}
        <q-popup-edit v-model="customer.name" v-if="edit" >
          <q-input v-model="customer.name" label="Describe issue" dense autofocus />
        </q-popup-edit>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-pa-sm row bg-grey-7">
      <q-input
        v-model="customer.phone"
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
        v-model="customer.addr1"
        color="blue"
        label="Address"
        :readonly="!edit"
        class="full-width"
        dense>
        <template v-slot:prepend>
          <q-icon name="map" color="blue" />
        </template>
      </q-input>
      <q-input
        v-model="customer.addr2"
        color="blue"
        label="Address"
        :readonly="!edit"
        class="full-width"
        dense>
        <template v-slot:prepend>
          <q-icon name="map" color="blue" />
        </template>
      </q-input>
      <q-input
        v-model="customer.postal_code"
        color="blue"
        label="Postal code"
        :readonly="!edit"
        class="col-4"
        dense>
        <template v-slot:prepend>
          <q-icon name="screen_share" color="blue" />
        </template>
      </q-input>
      <q-input
        v-model="customer.city"
        color="blue"
        label="City"
        :readonly="!edit"
        class="col-8"
        dense />
    </q-card-section>

    <q-separator />

    <q-card-actions align="around" class="bg-grey-9" v-if="!edit">
      <q-btn round flat color="primary" icon="navigation" />
      <q-btn round flat color="negative" icon="delete" @click='deleteCustomer' />
      <q-toggle
        color="negative"
        icon="warning"
        v-model="customer.machine_down"
        @input="updateCustomer" />
      <q-btn round flat color="positive" type="a" :href="'tel:'+customer.phone" icon="phone" />
      <q-btn round flat color="white" icon="edit" @click="edit = true" />
    </q-card-actions>
    <q-card-actions align="around" class="bg-white" v-else>
      <q-btn round flat color="negative" icon="cancel" @click="customer.create ? deleteCustomer() : edit = false" />
      <q-btn round flat color="positive" icon="done" @click="updateCustomer" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'CardCustomer',
  props: ['customer'],
  data () {
    return {
      edit: false
    }
  },
  mounted () {
    this.edit = this.customer.create || false
  },
  methods: {
    deleteCustomer () {
      console.log('Delete customer ' + this.customer.id)
      this.$store.dispatch('customers/delete', this.customer.id)
    },
    updateCustomer () {
      console.log('Update customer ' + this.customer.id)
      this.customer.create = false
      this.$store.dispatch('customers/set', this.customer)
      this.edit = false
    },
    toggleMachineDown () {
      this.customer.machine_down = !this.customer.machine_down
      this.updateCustomer()
    }
  }
}
</script>
