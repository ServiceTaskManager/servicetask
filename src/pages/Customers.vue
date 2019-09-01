<template>
  <div class="container">
    <customer-list />

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="black" :to="{ name: 'customersCreate' }" />
    </q-page-sticky>
  </div>
</template>

<script>
import CustomerList from '../components/CustomerList'

export default {
  name: 'Customers',
  data () {
    return {}
  },
  components: {
    CustomerList
  }
}
</script>
