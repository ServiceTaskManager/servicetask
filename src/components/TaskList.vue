<template>
  <q-list>
    <q-item v-if="addButton">
      <q-btn @click="taskCreate = true"
        rounded
        label="Add a task"
        :icon="$tasks.meta.icon"
        :color="$tasks.meta.color"
        class="full-width" />
      <task-edit-dialog v-model="taskCreate"
        :task="taskFormData" />
    </q-item>

    <filter-form v-model="customFilters" v-if="!hideFilters" />

    <task-item
      v-for="task in tasksFiltered"
      :key="task.id"
      :task="task"
      :hide-customer="hideCustomer"
      :hide-engine="hideEngine" />

    <q-item v-if="tasksFiltered.length === 0">
      <q-item-section class="text-center">
        <q-item-label class="text-h5">There's no task to display.</q-item-label>
        <q-item-label caption v-if="Object.values(customFilters).length > 0">Check the filters</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import TaskItem from './TaskItem'
import FilterForm from './FilterForm'
import TaskEditDialog from './TaskEditDialog'

export default {
  name: 'TaskList',
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
    },
    hideEngine: {
      type: Boolean,
      default: false
    },
    addButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      taskCreate: false,
      customFilters: {
        title: ['contains', '', 'Title'],
        customer: ['includes', '', 'Customer'] }
    }
  },
  computed: {
    tasksFiltered () {
      return this.$store.getters['tasks/filter'](Object.assign({}, this.customFilters, this.filters))
    },
    taskFormData () {
      return {
        customer: this.filters.customer[1][0],
        engine: this.filters.engine[1][0]
      }
    }
  },
  components: {
    TaskItem,
    FilterForm,
    TaskEditDialog
  }
}
</script>
