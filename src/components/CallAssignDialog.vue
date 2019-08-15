<template>
  <q-dialog v-bind="$attrs" v-on="$listeners" :value="value" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col-4">
          <q-icon name="phone" size="70px" color="green" />
        </div>
        <div class="col-8">
          <span>Choose to assign yourself so other people knows you're taking care of this call.</span>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat rounded icon="undo" color="grey" v-close-popup />
        <q-btn v-close-popup rounded
          icon="phone"
          color="grey"
          type="a"
          :href="'tel:' + call.phone" />
        <q-btn v-close-popup rounded
          icon="phone"
          :label="call.phone"
          color="positive"
          type="a"
          :href="'tel:' + call.phone"
          @click="assign" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: 'CallAssignDialog',
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
    assign () {
      this.call.status = 'assigned'
      this.call.assign_to = this.$store.state.user.data.id
      this.$store.dispatch('calls/patch', this.call)
    }
  }
}
</script>
