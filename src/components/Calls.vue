<template>
  <div class="container">
    <div
      class="row q-col-gutter-sm">
      <div
        v-for="(call, key) in calls"
        :key="key"
        class="col-12 col-sm-4">
        <card-call :call="call" />
      </div>
    </div>

    <q-btn
      fab
      :color="model.color"
      icon="add"
      class="fixed-bottom-right"
      style="margin-right: 10px; margin-bottom: 10px"
      @click="createCall" />
  </div>
</template>

<script>
import CardCall from '../components/CardCall'

export default {
  name: 'Calls',
  data () {
    return {
      calls: {}
    }
  },
  mounted () {
    this.calls = this.$store.state.calls.data
  },
  computed: {
    model () {
      return this.$store.state.model.models.calls
    }
  },
  methods: {
    createCall () {
      this.$store.dispatch('calls/set', { create: true })
    }
  },
  components: {
    CardCall
  }
}
</script>
