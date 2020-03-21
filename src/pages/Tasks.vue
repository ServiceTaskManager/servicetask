<template>
  <div>
    <filter-form v-model="filters" class="q-pa-sm" expand-icon-toggle>
      <template v-slot:header>
        <boolean-field @click.native.stop=""
          v-model="filters[0][2]"
          :options="options" />
      </template>
    </filter-form>
    <task-list :filters="filters" hide-filters />
  </div>
</template>

<script>
export default {
  name: 'Tasks',
  data () {
    return {
      tab: 'todo',
      filters: [
        ['done', '==', false, 'Done ?', true],
        ['customer', 'contains', ''],
        ['user', 'contains', '']],
      options: [{
        label: 'To do',
        value: false
      }, {
        label: 'Done',
        value: true
      }, {
        label: 'All',
        value: 'all'
      }]
    }
  },
  components: {
    TaskList: () => import('../components/task/TaskList'),
    FilterForm: () => import('../components/generic/FilterForm'),
    BooleanField: () => import('../components/generic/BooleanField')
  }
}
</script>
