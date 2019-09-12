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
      type: Object,
      default: () => {
        return {}
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
      customFilters: {
        name: ['contains', '', 'Name'],
        sn: ['contains', '', 'Serial number'],
        customer: ['includes', '', 'Customer'],
        main: ['==', true, 'Main']
      }
    }
  },
  computed: {
    enginesFiltered () {
      return this.$store.getters['engines/filter'](Object.assign(this.customFilters, this.filters))
    }
  },
  components: {
    EngineItem,
    FilterForm
  }
}
</script>
