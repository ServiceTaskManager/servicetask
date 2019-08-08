<template>
  <div class="container">
    <div
      class="row q-col-gutter-sm">
      <div
        v-for="(customer, key) in customers"
        :key="key"
        class="col-12 col-sm-4">
        <card-customer :customer="customer" />
      </div>
    </div>

    <q-btn
      fab
      :color="model.color"
      icon="add"
      class="fixed-bottom-right"
      style="margin-right: 10px; margin-bottom: 10px"
      @click="createCustomer" />
  </div>
</template>

<script>
import CardCustomer from '../components/CardCustomer'

export default {
  name: 'Customers',
  data () {
    return {
      customers: {}
    }
  },
  mounted () {
    this.customers = this.$store.state.customers.data
  },
  computed: {
    model () {
      return this.$store.state.customers
    }
  },
  methods: {
    createCustomer () {
      this.$store.dispatch('customers/set', { create: true })
    }
  },
  components: {
    CardCustomer
  }
}
</script>
