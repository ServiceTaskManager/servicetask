<template>
  <div class="row justify-end">
    <q-btn
      flat round
      icon="edit"
      @click="customerDialog = true" />
    <q-btn
      flat round
      icon="more_vert"
      @click="bottomSheet" />

    <customer-edit-dialog v-model="customerDialog" :customer="$customers.data[$route.params.id]" />
  </div>
</template>

<script>
import CustomerEditDialog from './CustomerEditDialog'

export default {
  name: 'CustomersToolbar',
  data () {
    return {
      customerDialog: false
    }
  },
  computed: {
    customer () {
      return this.$customers.data[this.$route.params.id]
    }
  },
  methods: {
    bottomSheet () {
      this.$q.bottomSheet({
        actions: this.$store.getters['customers/getActions'](this.customer.id)
      }).onOk(action => {
        let payload = {}
        if (action.patch) {
          payload = {
            doc: action.patch,
            ids: [this.customer.id]
          }
          this.$store.dispatch('customers/patchBatch', payload)
        } else if (action.action) {
          payload = {
            parent: this,
            ids: [this.customer.id]
          }
          this.$store.dispatch('customers/' + action.action, payload)
        }
      })
    }
  },
  components: {
    CustomerEditDialog
  }
}
</script>
