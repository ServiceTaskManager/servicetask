<template>
  <div>
    <store-list :filters="filters" :store="$route.meta.store" />
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
    StoreList: () => import('../components/generic/StoreList')
  }
}
</script>
