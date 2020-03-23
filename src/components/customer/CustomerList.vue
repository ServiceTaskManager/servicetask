<template>
  <q-list>
    <filter-form v-model="customFilters" v-if="!hideFilters" />

    <customer-item
      v-for="customer in customers"
      :key="customer.id"
      :customer="customer"
      :no-select="noSelect"
      :no-link="noLink">

      <template #item-left>
        <slot name="item-left" :customer="customer"></slot>
      </template>
      <template #item-right>
        <slot name="item-right" :customer="customer"></slot>
      </template>
    </customer-item>
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
    },
    noLink: {
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
