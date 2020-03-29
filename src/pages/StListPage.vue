<template>
  <div>
    <st-list :filters="filters" :model="$route.name.slice(0, -1)" />
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
