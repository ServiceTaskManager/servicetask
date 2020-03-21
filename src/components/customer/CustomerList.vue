<template>
  <q-list>
    <filter-form v-model="customFilters" v-if="!hideFilters" />

    <customer-item
      v-for="customer in customers"
      :key="customer.id"
      :customer="customer"
      :no-select="noSelect" />
  </q-list>
</template>

<script>
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
    },
    noSelect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      customFilters: []
    }
  },
  computed: {
    customers () {
      return this.$store.getters['customers/filter'](this.filters.concat(this.customFilters))
    }
  },
  components: {
    CustomerItem: () => import('./CustomerItem'),
    FilterForm: () => import('../generic/FilterForm')
  }
}
</script>
