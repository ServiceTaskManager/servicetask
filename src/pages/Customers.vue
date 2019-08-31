<template>
  <div class="container">
    <q-list>
      <q-item>
        <q-input v-model="filter.name"
          type="text"
          placeholder="Search"
          icon="search"
          class="full-width">
          <template v-slot:prepend>
            <q-icon name="search" color="grey" />
          </template>
        </q-input>
      </q-item>

      <customer-item v-for="customer in customersFiltered" :key="customer.id" :customer="customer" />
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="black" :to="{ name: 'customersCreate' }" />
    </q-page-sticky>
  </div>
</template>

<script>
import CustomerItem from '../components/CustomerItem'

export default {
  name: 'Customers',
  data () {
    return {
      filter: {
        name: ''
      },
      customerDialog: false,
      customer: this.$store.state.customers.default,
      customers: Object.values(this.$store.state.customers.data).sort((a, b) => (a.name > b.name) ? 1 : -1)
    }
  },
  computed: {
    customersFiltered () {
      if (this.filter.name === '') return this.customers
      else return this.customers.filter(c => c.name.toLowerCase().indexOf(this.filter.name.toLowerCase()) > -1)
    }
  },
  components: {
    CustomerItem
  }
}
</script>
