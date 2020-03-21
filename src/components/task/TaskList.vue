<template>
  <q-list>
    <slot name="header" />
    <slot name="filter">
      <filter-form v-model="customFilters" v-if="!hideFilters" />
    </slot>

    <task-item
      v-for="task in tasksFiltered"
      :key="task.id"
      :task="task"
      :hide-customer="hideCustomer"
      :hide-engine="hideEngine"
      :no-select="noSelect" />

    <q-item v-if="tasksFiltered.length === 0 && !hideNoResult">
      <q-item-section class="text-center">
        <q-item-label>There's no task to display.</q-item-label>
        <q-item-label caption v-if="customFilters.filter(f => f[2] !== '').length > 0">Check the filters</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'TaskList',
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
    noSelect: {
      type: Boolean,
      default: false
    },
    hideNoResult: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      taskCreate: false,
      taskFilters: [
        ['title', 'contains', '', 'Title'],
        ['customer', '==', '', 'Customer'],
        ['user', '==', '', 'Technician']
      ]
    }
  },
  computed: {
    tasksFiltered () {
      return this.$store.getters['tasks/filter'](this.filters.concat(this.customFilters))
    },
    customFilters: {
      get () {
        let filteredKey = this.filters.map(f => f[0])
        let filters = this.taskFilters.filter(f => !filteredKey.includes(f[0]))
        return filters
      },
      set (val) {
        this.callFilters = val
      }
    }
  },
  components: {
    TaskItem: () => import('./TaskItem'),
    FilterForm: () => import('../generic/FilterForm')
  }
}
</script>
