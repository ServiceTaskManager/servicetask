<template>
  <div>
    <filter-form v-model="filters" class="q-pa-xs" expand-icon-toggle>
      <template v-slot:header>
        <q-input v-model="filters[0][2]"
          class="full-width"
          spread
          stretch
          dense>
          <template v-slot:append>
            <q-icon name="search" color="grey" />
          </template>
        </q-input>
      </template>
    </filter-form>
    <customer-list :filters="filters" hide-filters />
  </div>
</template>

<script>
export default {
  name: 'Customers',
  data () {
    return {
      filters: [
        ['name', 'contains', '', '', true],
        ['technician', '==', '', 'Technician']]
    }
  },
  components: {
    CustomerList: () => import('../components/customer/CustomerList'),
    FilterForm: () => import('../components/generic/FilterForm')
  }
}
</script>
