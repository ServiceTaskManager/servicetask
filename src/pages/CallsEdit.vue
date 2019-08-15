<template>
  <q-list>
    <q-item>
      <customer-field v-model="call.customer" />
    </q-item>
    <q-item>
      <engine-field
        v-model="call.engine"
        :customer="call.customer" />
    </q-item>
    <q-item>
      <q-input
        v-model="call.title"
        color="grey"
        label="Describe issue"
        class="full-width">
        <template v-slot:prepend>
          <q-icon name="description" color="grey" />
        </template>
      </q-input>
    </q-item>
    <q-item>
      <q-input
        v-model="call.person"
        color="orange"
        label="Contact name"
        class="full-width">
        <template v-slot:prepend>
          <q-icon name="person" color="orange" />
        </template>
      </q-input>
    </q-item>
    <q-item>
      <q-input
        v-model="call.phone"
        color="green"
        label="Phone number"
        class="full-width">
        <template v-slot:prepend>
          <q-icon name="phone" color="green" />
        </template>
      </q-input>
    </q-item>
    <q-item class="row">
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
    </q-item>
    <q-item class="absolute-bottom bg-white">
      <q-item-section class="text-right">
        <div>
          <q-btn rounded flat
            color="grey"
            label="Back to calls list"
            icon="undo"
            :to="{ name: 'calls' }" />
          <q-btn rounded
            color="positive"
            type="submit"
            icon="done"
            @click="setCall"
            :label="create ? 'Create' : 'Edit'" />
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import CustomerField from '../components/CustomerField'
import EngineField from '../components/EngineField'

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
      let callValues = Object.values(this.$store.state.calls.call).length > 0 ? this.$store.state.calls.call : this.$store.state.calls.default
      this.call = this.create ? callValues : this.$store.state.calls.data[this.id]
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
    CustomerField,
    EngineField
  }
}
</script>
