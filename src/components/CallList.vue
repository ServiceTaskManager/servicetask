<template>
  <q-list>
    <filter-form v-model="customFilters" v-if="!hideFilters" />

    <call-item
      v-for="call in callsFiltered"
      :key="call.id"
      :call="call" />

    <q-item v-if="callsFiltered.length === 0">
      <q-item-section class="text-center">
        <q-item-label class="text-h5">There's no call to display.</q-item-label>
        <q-item-label caption v-if="Object.values(customFilters).length > 0">Check the filters</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import CallItem from './CallItem'
import FilterForm from './FilterForm'

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
    }
  },
  data () {
    return {
      customFilters: [{
        name: 'Title',
        property: 'title',
        filter: 'contains',
        value: ''
      }, {
        name: 'Customer',
        property: 'customer',
        filter: 'includes',
        value: ''
      }]
    }
  },
  computed: {
    callsFiltered () {
      return this.$store.getters['calls/filter'](this.filters.concat(this.customFilters))
    }
  },
  components: {
    CallItem,
    FilterForm
  }
}
</script>
