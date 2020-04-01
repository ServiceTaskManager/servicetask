<template>
  <div class="row justify-end">
    <div class="on-left">
      <customer-field color="grey" dark standout rounded dense
      v-model="customer"
      @input="value.zoomToCustomer(customer)" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapToolbar',
  props: {
    value: {
      type: Object,
      default: undefined
    }
  },
  data () {
    return {
      customer: ''
    }
  },
  components: {
    CustomerField: () => import('../components/customer/CustomerField')
  }
}
</script>
