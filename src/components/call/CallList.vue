<template>
  <q-list>
    <slot name="header" />
    <slot name="filter">
      <filter-form v-model="customFilters" v-if="!hideFilters" />
    </slot>

    <call-item
      v-for="call in callsFiltered"
      :key="call.id"
      :call="call"
      :hide-customer="hideCustomer"
      :hide-engine="hideEngine"
      :no-select="noSelect" />

    <q-item v-if="callsFiltered.length === 0 && !hideNoResult">
      <q-item-section class="text-center">
        <q-item-label>There's no call to display.</q-item-label>
        <q-item-label caption v-if="customFilters.filter(f => f[2] !== '').length > 0">Check the filters</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'CallList',
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
    hideCustomer: {
      type: Boolean,
      default: false
    },
    hideEngine: {
      type: Boolean,
      default: false
    },
    hideNoResult: {
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
      callFilters: [
        ['title', 'contains', '', 'Title'],
        ['customer', '==', '', 'Customer'],
        ['user', '==', '', 'Technician']
      ]
    }
  },
  computed: {
    callsFiltered () {
      return this.$store.getters['calls/filter'](this.filters.concat(this.customFilters))
    },
    customFilters: {
      get () {
        let filteredKey = this.filters.map(f => f[0])
        let filters = this.callFilters.filter(f => !filteredKey.includes(f[0]))
        return filters
      },
      set (val) {
        this.callFilters = val
      }
    }
  },
  components: {
    CallItem: () => import('./CallItem'),
    FilterForm: () => import('../generic/FilterForm')
  }
}
</script>
