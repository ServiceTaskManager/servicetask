<template>
  <q-list>
    <filter-form v-model="customFilters" v-if="!hideFilters" />

    <customer-item
      v-for="customer in customers"
      :key="customer.id"
      :customer="customer" />
  </q-list>
</template>

<script>
import CustomerItem from './CustomerItem'
import FilterForm from './FilterForm'

export default {
  name: 'CustomerList',
  props: {
    filters: {
      type: Array,
      default: () => {
        return []
      }
    },
    hideFilters: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      customFilters: [{
        name: 'Name',
        property: 'name',
        filter: 'contains',
        value: ''
      }, {
        name: 'Postal code',
        property: 'postal_code',
        filter: 'contains',
        value: ''
      }]
    }
  },
  computed: {
    customers () {
      return this.$store.getters['customers/filter'](this.filters.concat(this.customFilters))
    }
  },
  components: {
    CustomerItem,
    FilterForm
  }
}
</script>
