<template>
  <q-card :key="data.id">
    <q-card-section
      class="q-pa-sm text-white"
      :class="data.machine_down ? 'bg-negative' : 'bg-grey-9'">
      <div class="text-h6 ellipsis">
        {{ data.title }}
        <q-popup-edit v-model="data.title">
          <q-input v-model="data.title" v-on:input="updateCall" dense autofocus />
        </q-popup-edit>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-pa-sm row bg-grey-7">
      <q-chip dense class="col-12">
        <q-avatar icon="people" color="pink" text-color="white" />
        {{ customer.name }}
      </q-chip>
      <q-chip dense class="col-12">
        <q-avatar icon="person" color="red" text-color="white" />
        {{ data.person }}
        <q-popup-edit dense v-model="data.person">
          <q-input v-model="data.person" @input="updateCall" dense autofocus />
        </q-popup-edit>
      </q-chip>
      <q-chip dense class="col-12">
        <q-avatar icon="phone" color="green-9" text-color="white" />
        {{ data.phone }}
        <q-popup-edit dense v-model="data.phone">
          <q-input v-model="data.phone" @input="updateCall" dense autofocus />
        </q-popup-edit>
      </q-chip>
      <q-chip dense class="col-12">
        <q-avatar icon="screen_share" color="blue-9" text-color="white" />
        <span>
          ID: {{ data.teamviewer_id }}
          <q-popup-edit dense v-model="data.teamviewer_id">
            <q-input v-model="data.teamviewer_id" @input="updateCall" dense autofocus />
          </q-popup-edit>
        </span>
        <span>
          &nbsp;/ Password: {{ data.teamviewer_pwd }}
          <q-popup-edit dense v-model="data.teamviewer_pwd">
            <q-input v-model="data.teamviewer_pwd" @input="updateCall" dense autofocus />
          </q-popup-edit>
        </span>
      </q-chip>
    </q-card-section>

    <q-separator />

    <q-card-actions align="around" class="bg-grey-9">
      <q-btn round flat color="secondary" icon="forward" />
      <q-btn round flat color="positive" icon="done" @click='deleteCall' />
      <q-toggle
        color="negative"
        icon="warning"
        v-model="data.machine_down"
        @input="updateCall" />
      <q-btn round flat color="positive" type="a" :href="'tel:'+data.phone" icon="phone" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { QCard, QBtn, QAvatar, QChip } from 'quasar'

export default {
  name: 'SCustomer',
  props: ['data'],
  data () {
    return {}
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
    QChip,
    QAvatar
  }
}
</script>
