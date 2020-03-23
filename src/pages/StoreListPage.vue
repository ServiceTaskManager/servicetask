<template>
  <div>
    <filter-form v-model="filters" class="q-pa-sm" expand-icon-toggle />
    <store-list :filters="filters" :store="$route.meta.store" hide-filters />
  </div>
</template>

<script>
export default {
  name: 'StoreListPage',
  data () {
    return {
      filters: []
    }
  },
  components: {
    StoreList: () => import('../components/generic/StoreList'),
    FilterForm: () => import('../components/generic/FilterForm')
  }
}
</script>
