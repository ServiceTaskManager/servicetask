<template>
  <q-dialog v-bind="$attrs" v-on="$listeners" :value="value" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col-4">
          <q-icon name="close" size="70px" color="grey" />
        </div>
        <div class="col-8">
          <span>Would you like to close the call?</span>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat rounded icon="undo" color="grey" v-close-popup />
        <q-btn v-close-popup rounded
          icon="phone"
          label="Close"
          color="positive"
          @click="close" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: 'CallCloseDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    call: {
      type: Object,
      default: () => {
        return this.$store.state.calls.default
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    close () {
      this.call.status = 'closed'
      this.call.closed_at = new Date()
      this.$store.dispatch('calls/patch', this.call)
    }
  }
}
</script>
