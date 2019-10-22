<template>
  <div class="container">
    <customer-list />

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" :color="$customers.meta.color" @click="customerCreate = true" />
    </q-page-sticky>

    <customer-edit-dialog v-model="customerCreate" />
  </div>
</template>

<script>
import CustomerList from '../components/CustomerList'
import CustomerEditDialog from '../components/CustomerEditDialog'

export default {
  name: 'Customers',
  data () {
    return {
      customerCreate: false
    }
  },
  components: {
    CustomerList,
    CustomerEditDialog
  }
}
</script>
