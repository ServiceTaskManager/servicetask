<template>
  <div>
    <st-list :filters="filters" :model="$route.meta.model" />
  </div>
</template>

<script>
export default {
  name: 'StListPage',
  data () {
    return {
      filters: []
    }
  },
  components: {
    StList: () => import('../components/generic/StList')
  }
}
</script>
