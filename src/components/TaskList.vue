<template>
   <div>
    <q-list>
      <filter-form v-model="customFilters" v-if="!hideFilters" />

      <task-item
        v-for="task in tasksFiltered"
        :key="task.id"
        :task="task" />

      <q-item v-if="tasksFiltered.length === 0">
        <q-item-section class="text-center">
          <q-item-label class="text-h5">There's no task to display.</q-item-label>
          <q-item-label caption v-if="Object.values(customFilters).length > 0">Check the filters</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import TaskItem from './TaskItem'
import FilterForm from './FilterForm'

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
    tasksFiltered () {
      return this.$store.getters['tasks/filter'](this.filters.concat(this.customFilters))
    }
  },
  components: {
    TaskItem,
    FilterForm
  }
}
</script>
