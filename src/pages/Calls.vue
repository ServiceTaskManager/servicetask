<template>
  <div>
    <filter-form v-model="filters" class="q-pa-sm" expand-icon-toggle>
      <template v-slot:header>
        <boolean-field @click.native.stop=""
          v-model="filters[0][2]"
          :options="options" />
      </template>
    </filter-form>
    <call-list :filters="filters" hide-filters />
  </div>
</template>

<script>
export default {
  name: 'Calls',
  data () {
    return {
      filters: [
        ['status', '==', 'open', 'Status ?', true],
        ['customer', 'contains', ''],
        ['user', 'contains', '']],
      options: [{
        label: 'Open',
        value: 'open'
      }, {
        label: 'Closed',
        value: 'close'
      }, {
        label: 'All',
        value: 'all'
      }]
    }
  },
  components: {
    CallList: () => import('../components/call/CallList'),
    FilterForm: () => import('../components/generic/FilterForm'),
    BooleanField: () => import('../components/generic/BooleanField')
  }
}
</script>
