<template>
  <div>
    {{ data }}
  </div>
</template>

<script>
export default {
  name: 'StorePage',
  computed: {
    data () {
      return this['$' + this.$route.meta.store].data[this.$route.params.id]
    }
  }
}
</script>
