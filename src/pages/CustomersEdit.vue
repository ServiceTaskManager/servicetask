<template>
  <div>
    <customer-form @submit="$router.push({ name: 'customers' })" @cancel="$router.push({ name: 'customers' })" :customer-id="$route.params.id" />
  </div>
</template>

<script>
import CustomerForm from '../components/CustomerForm.vue'

export default {
  name: 'CustomersEdit',
  data () {
    return {}
  },
  components: {
    CustomerForm
  }
}
</script>
