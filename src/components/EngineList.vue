<template>
  <div>
    <q-list>
      <filter-form v-model="customFilters" v-if="!hideFilters" />

      <engine-item
        v-for="engine in enginesFiltered"
        :key="engine.id"
        :engine="engine" :hideCustomer="hideCustomer" />

      <q-item v-if="enginesFiltered.length === 0">
        <q-item-section class="text-center">
          <q-item-label class="text-h5">There's no engine to display.</q-item-label>
          <q-item-label caption>Check the filters</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import EngineItem from './EngineItem'
import FilterForm from './FilterForm'

export default {
  name: 'EngineList',
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
        name: 'Serial number',
        property: 'sn',
        filter: 'contains',
        value: ''
      }, {
        name: 'Customer',
        property: 'customer',
        filter: 'includes',
        value: ''
      }, {
        name: 'Main',
        property: 'main',
        filter: 'boolean',
        value: ''
      }]
    }
  },
  computed: {
    enginesFiltered () {
      console.log(this.filters.concat(this.customFilters))
      return this.$store.getters['engines/filter'](this.filters.concat(this.customFilters))
    }
  },
  components: {
    EngineItem,
    FilterForm
  }
}
</script>
